const API_BASE = "https://oss.exercisedb.dev/api/v1";

async function fetchJson(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        ...(options.headers || {}),
      },
    });

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.error(`Expected JSON from ${url}, got ${contentType}`);
      return null;
    }

    const data = await response.json();
    if (!response.ok || data?.success === false) {
      console.error(`API error from ${url}:`, data?.error || response.status);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Fetch failed for ${url}:`, error);
    return null;
  }
}

export async function fetchBodyPartExercise(bodyPart) {
  const data = await fetchJson(
    `${API_BASE}/exercises/bodyparts?bodyParts=${encodeURIComponent(bodyPart)}&limit=1`,
    { cache: "force-cache" }
  );
  return data?.data?.[0] || null;
}

export async function fetchExercisesByBodyPart(bodyPart) {
  const data = await fetchJson(
    `${API_BASE}/exercises/bodyparts?bodyParts=${encodeURIComponent(bodyPart)}&limit=25`,
    { cache: "force-cache" }
  );
  return data?.data || [];
}

export async function fetchExercisesByMuscle(muscle) {
  const data = await fetchJson(
    `${API_BASE}/exercises/muscles?targetMuscles=${encodeURIComponent(muscle)}&limit=25`,
    { cache: "no-store" }
  );
  return data?.data || [];
}

export async function fetchExercisesByEquipment(equipment) {
  const data = await fetchJson(
    `${API_BASE}/exercises/equipments?equipments=${encodeURIComponent(equipment)}&limit=25`,
    { cache: "no-store" }
  );
  return data?.data || [];
}

export async function fetchEquipments() {
  const data = await fetchJson(`${API_BASE}/equipments`, {
    cache: "force-cache",
  });
  return data?.data || [];
}

export async function fetchExerciseById(exerciseId) {
  const data = await fetchJson(`${API_BASE}/exercises/${exerciseId}`, {
    cache: "no-store",
  });
  return data?.data || null;
}

export async function searchExercises(query) {
  const data = await fetchJson(
    `${API_BASE}/exercises/search?search=${encodeURIComponent(query)}`
  );
  return data?.data || [];
}
