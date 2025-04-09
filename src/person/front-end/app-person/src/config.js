import configJson from "../auth_config.json";

export function getConfig() {
  const audience =
    configJson.audience && configJson.audience !== "{yourApiIdentifier}"
      ? configJson.audience
      : null;

  return {
    domain: configJson.domain,
    clientId: configJson.clientId,
    ...(audience ? { audience } : null),
  };
} 