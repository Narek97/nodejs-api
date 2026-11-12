# nodejs-api GitOps demo

Minimal dependency-free Node.js 22 HTTP API for a Minikube + Argo CD lab.

## Run locally

```bash
npm ci
npm test
npm start
curl http://localhost:3000/health
```

## GitOps integration

1. Create GitHub repository `Narek97/nodejs-api` and push these files.
2. In GitHub repo settings > Secrets and variables > Actions, add `ARGOCD_REPO_TOKEN` (fine-grained GitHub PAT; Contents: Read and write on `Narek97/argocd`).
3. Push a tag, e.g. `git tag v1.0.0 && git push origin v1.0.0`.
4. CI runs tests, publishes `ghcr.io/narek97/nodejs-api:v1.0.0`, and updates `applications/nodejs-api/dev/values.yaml` in `Narek97/argocd`.
5. Set the GHCR package visibility to Public for anonymous Minikube pulls, or configure an imagePullSecret.
6. Argo CD synchronizes the GitOps Helm values. The Kubernetes Secrets from Forgejo must exist in `nodejs-dev`.

Do not commit genuine passwords/tokens to Forgejo as base64 or plaintext. Replace with encrypted or centrally managed secrets for real deployments.

The application uses `ENV`, `LOG_LEVEL`, `TRINO_HOST`, `API_TOKEN`, `DB_PASSWORD`, and `PORT`; it reports only whether secrets are configured, not their contents.
