import { serveDir } from "https://deno.land/std@0.151.0/http/file_server.ts";
import { setCookie, getCookies } from "https://deno.land/std@0.74.0/http/mod.ts";

function makeId(){
  return crypto.randomUUID();
}

Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(pathname);

  if (req.method === "GET" && pathname === "/welcome-message") {
    Response("jigインターンへようこそ！");
  }
  if (req.method === "GET" && pathname === "/getId"){
    return new Response(
      "set id", {
        status: 200,
        headers: {
          "set-cookie": `id=${makeId()}`
        }
      }
    );
  }

  return serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
    showDirListing: true,
    enableCors: true,
  });
});
