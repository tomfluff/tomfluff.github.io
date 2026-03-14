FROM mcr.microsoft.com/devcontainers/jekyll

# Remove the stale Yarn apt repository whose GPG key is no longer valid,
# which causes `apt-get update` to fail with NO_PUBKEY 62D54FD4003F6525.
RUN rm -f /etc/apt/sources.list.d/yarn.list \
    && rm -f /usr/share/keyrings/yarnkey.gpg \
    && apt-get clean
