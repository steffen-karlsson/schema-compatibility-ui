export function b64enc(data: string) {
  return btoa(new TextEncoder().encode(data).join(' '));
}

export function b64dec(base64: string) {
  return new TextDecoder().decode(
    new Uint8Array(
      atob(base64)
        .split(' ')
        .map((x) => parseInt(x, 10))
    )
  );
}
