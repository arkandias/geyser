FROM quay.io/keycloak/keycloak:24.0 as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=postgres

COPY ./providers /opt/keycloak/providers
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak/ /opt/keycloak/

COPY ./kc_healthcheck.sh /usr/local/bin/healthcheck
HEALTHCHECK --interval=10s --timeout=10s --retries=3 \
    --start-period=30s --start-interval=1s \
    CMD healthcheck

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_DB=postgres

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
