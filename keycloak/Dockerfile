FROM quay.io/keycloak/keycloak:26.4.2 AS builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=postgres

RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:26.4.2
COPY --from=builder /opt/keycloak/ /opt/keycloak/
COPY ./geyser-realm.json /opt/keycloak/data/import/
COPY --chmod=755 ./healthcheck.sh /usr/local/bin/

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_DB=postgres
ENV KC_CACHE=local

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
