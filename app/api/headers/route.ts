export function GET(request: Request) {
  const headers = Object.fromEntries(request.headers);
  return Response.json(headers, { status: 200 });
}
