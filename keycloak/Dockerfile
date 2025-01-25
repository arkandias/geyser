FROM quay.io/keycloak/keycloak:26.1 AS builder

# Enable health and metrics support
ENV KC_LEGACY_OBSERVABILITY_INTERFACE=true
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=postgres

COPY providers /opt/keycloak/providers

RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:26.1
COPY --from=builder /opt/keycloak/ /opt/keycloak/

# Add healthcheck (needs disabling management interface)
COPY healthcheck /usr/local/bin/healthcheck

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_DB=postgres

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
