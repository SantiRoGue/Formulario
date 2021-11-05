import { createServer, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create("user", {usuario:"bob32", name: "Bob" })
      server.create("user", {usuario:"alice44", name: "Alice" })
      server.create("user", {usuario:"paco32", name: "Paco" })
    },

    routes() {
      this.timing=1000
      this.namespace = "api"

      this.get("/users", (schema) => {
        return schema.users.all();
      }),
      this.post("/users", (schema, request) => {  
        let user = JSON.parse(request.requestBody);
        let result = schema.users.create(user);
        
        return result.isSaved();
      })
    },
  })

  return server
}