const baseUrl = "v1";
async function httpGetPlanets() {
  // TODO: Once API is ready.
  const response = await fetch(`${baseUrl}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  try {
    const response = await fetch(`${baseUrl}/launches`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${baseUrl}/launches`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  try {
    return await fetch(`${baseUrl}/launches/${id}`, {
      method: "delete",
    });
  } catch (error) {
    return { ok: false };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
