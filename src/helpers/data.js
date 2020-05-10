export function getServiceById(services, id) {
  return services.find(service => service.id === id);
}

export function getServiceByModalityType(service, type) {
  return service.modalities.find(modality => modality.type === type);
}