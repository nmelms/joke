export function GET(request: Request) {
  const headers = Object.fromEntries(request.headers);
  console.log("incoming headers", headers);
  return Response.json(headers, { status: 200 });
}
