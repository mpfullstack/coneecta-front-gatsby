import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ArrowUp, ArrowDown } from '../../components/icons';

const PickerWrapper = styled.div`
  .picker-container {
    z-index: 10001;

    width: 100%;

    &, *, *:before, *:after {
      box-sizing: border-box;;
    }

    .picker-inner {
      position: relative;

      display: flex;
      justify-content: center;
      height: 100%;
      padding: 0 20px;

      font-size: 1.2em;
      -webkit-mask-box-image: linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);

      .picker-buttons {
        position: relative;
        right: 20%;
        z-index: -1;
        .button {
          border: none;
          text-decoration: none;
          cursor: pointer;
          font-weight: bold;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          background-color: transparent;
          .svg-inline--fa {
            font-size: 32px;
          }
        }
        .previous-button-container {
          position: absolute;
          top: 7%;
        }
        .next-button-container {
          position: absolute;
          bottom: 7%;
        }
      }
    }

    .picker-column {
      flex: 1 1;

      position: relative;

      max-height: 100%;

      overflow: hidden;
      text-align: center;

      .picker-scroller {
        transition: 300ms;
        transition-timing-function: ease-out;
      }

      .picker-item {
        position: relative;
        cursor: pointer;

        padding: 0 10px;

        white-space: nowrap;
        color: #999999;
        overflow: hidden;
        text-overflow: ellipsis;

        &.picker-item-selected {
          color: #222;
        }
      }
    }

    .picker-highlight {
      position: absolute;
      top: 50%;
      left: 0;

      width: 100%;

      pointer-events: none;

      &:before, &:after {
        content: ' ';
        position: absolute;
        left: 0;
        right: auto;

        display: block;
        width: 100%;
        height: 1px;

        background-color: #d9d9d9;
        transform: scaleY(0.5);
      }

      &:before {
        top: 0;
        bottom: auto;
      }

      &:after {
        bottom: 0;
        top: auto;
      }
    }
  }
`;

class PickerColumn extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    itemHeight: PropTypes.number.isRequired,
    columnHeight: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      ...this.computeTranslate(props)
    };

  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isMoving) {
      return;
    }
    this.setState(this.computeTranslate(nextProps));
  }

  computeTranslate = (props) => {
    const {options, value, itemHeight, columnHeight} = props;
    let selectedIndex = options.map((option) => option.value).indexOf(value);
    if (selectedIndex < 0) {
      // throw new ReferenceError();
      console.warn('Warning: "' + this.props.name+ '" doesn\'t contain an option of "' + value + '".');
      this.onValueSelected(options[0].value, this.isAvailable(options[0]));
      selectedIndex = 0;
    }
    return {
      scrollerTranslate: columnHeight / 2 - itemHeight / 2 - selectedIndex * itemHeight,
      minTranslate: columnHeight / 2 - itemHeight * options.length + itemHeight / 2,
      maxTranslate: columnHeight / 2 - itemHeight / 2
    };
  };

  onValueSelected = (newValue, available) => {
    this.props.onChange(this.props.name, newValue, available);
  };

  handleTouchStart = (event) => {
    const startTouchY = event.targetTouches[0].pageY;
    this.setState(({scrollerTranslate}) => ({
      startTouchY,
      startScrollerTranslate: scrollerTranslate
    }));
  };

  handleTouchMove = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const touchY = event.targetTouches[0].pageY;
    this.setState(({isMoving, startTouchY, startScrollerTranslate, minTranslate, maxTranslate}) => {
      if (!isMoving) {
        return {
          isMoving: true
        }
      }

      let nextScrollerTranslate = startScrollerTranslate + touchY - startTouchY;
      if (nextScrollerTranslate < minTranslate) {
        nextScrollerTranslate = minTranslate - Math.pow(minTranslate - nextScrollerTranslate, 0.8);
      } else if (nextScrollerTranslate > maxTranslate) {
        nextScrollerTranslate = maxTranslate + Math.pow(nextScrollerTranslate - maxTranslate, 0.8);
      }
      return {
        scrollerTranslate: nextScrollerTranslate
      };
    });
  };

  handleTouchEnd = (event) => {
    if (!this.state.isMoving) {
      return;
    }
    this.setState({
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0
    });
    setTimeout(() => {
      const {options, itemHeight} = this.props;
      const {scrollerTranslate, minTranslate, maxTranslate} = this.state;
      let activeIndex;
      if (scrollerTranslate > maxTranslate) {
        activeIndex = 0;
      } else if (scrollerTranslate < minTranslate) {
        activeIndex = options.length - 1;
      } else {
        activeIndex = - Math.floor((scrollerTranslate - maxTranslate) / itemHeight);
      }
      this.onValueSelected(options[activeIndex].value, this.isAvailable(options[activeIndex]));
    }, 0);
  };

  handleTouchCancel = (event) => {
    if (!this.state.isMoving) {
      return;
    }
    this.setState((startScrollerTranslate) => ({
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      scrollerTranslate: startScrollerTranslate
    }));
  };

  handleItemClick = (option) => {
    if (option.value !== this.props.value) {
      this.onValueSelected(option.value, this.isAvailable(option));
    }
  };

  isAvailable(option) {
    if ('available' in option && !option.available) {
      return false;
    } else {
      return true;
    }
  }

  renderItem({ option, index, className, style }) {
    const { onRenderItem } = this.props;
    const item = <div
      key={index}
      className={className}
      style={style}
      onClick={() => this.handleItemClick(option)}
      onKeyDown={() => null}
      role='button'
      aria-hidden='true'>{option.label}</div>;

    let customItemRender = null;
    if (onRenderItem) {
      customItemRender = onRenderItem(option, this.isAvailable(option));
    }
    return <div className='picker-item-wrapper'>{item}{customItemRender}</div>;
  }

  renderItems() {
    const {options, itemHeight, value} = this.props;
    return options.map((option, index) => {
      const style = {
        height: itemHeight + 'px',
        lineHeight: itemHeight + 'px'
      };
      let className = `picker-item${option.value === value ? ' picker-item-selected' : ''}`;
      className += `${!this.isAvailable(option) ? ' picker-item-not-available' : ''}`;
      return this.renderItem({option, index, className, style});
    });
  }

  goNext() {

  }

  goPrevious() {

  }

  render() {
    const translateString = `translate3d(0, ${this.state.scrollerTranslate}px, 0)`;
    const style = {
      MsTransform: translateString,
      MozTransform: translateString,
      OTransform: translateString,
      WebkitTransform: translateString,
      transform: translateString
    };
    if (this.state.isMoving) {
      style.transitionDuration = '0ms';
    }
    return(
      <>
        <div className="picker-column">
          <div
            className="picker-scroller"
            style={style}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
            onTouchCancel={this.handleTouchCancel}>
            {this.renderItems()}
          </div>
        </div>
        <div className="picker-buttons">
          <div className='previous-button-container'>
            <button className="button" onClick={() => this.goPrevious()}>
              <ArrowUp />
            </button>
          </div>
          <div className='next-button-container'>
            <button className="button" onClick={() => this.goNext()}>
              <ArrowDown />
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default class Picker extends Component {
  static propTyps = {
    optionGroups: PropTypes.object.isRequired,
    valueGroups: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    itemHeight: PropTypes.number,
    height: PropTypes.number
  };

  static defaultProps = {
    itemHeight: 36,
    height: 216
  };

  renderInner() {
    const {optionGroups, valueGroups, itemHeight, height, onChange, onRenderItem} = this.props;
    const highlightStyle = {
      height: itemHeight,
      marginTop: -(itemHeight / 2)
    };
    const columnNodes = [];
    for (let name in optionGroups) {
      columnNodes.push(
        <PickerColumn
          key={name}
          name={name}
          options={optionGroups[name]}
          value={valueGroups[name]}
          itemHeight={itemHeight}
          columnHeight={height}
          onChange={onChange}
          onRenderItem={onRenderItem} />
      );
    }
    return (
      <div className="picker-inner">
        {columnNodes}
        <div className="picker-highlight" style={highlightStyle}></div>
      </div>
    );
  }

  render() {
    const style = {
      height: this.props.height
    };

    return (
      <PickerWrapper>
        <div className="picker-container" style={style}>
          {this.renderInner()}
        </div>
      </PickerWrapper>
    );
  }
}
