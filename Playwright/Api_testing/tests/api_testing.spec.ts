import { test, expect } from "@playwright/test";

test("API Get", async ({ request }) => {
  const response = await request.get("https://catfact.ninja/fact");
  const body = await response.json();
  expect(response.ok()).toBeTruthy();
  expect(body.fact).toMatch(/\w/);
  expect(body.length).toBeGreaterThan(0);
});

test("API post", async ({ request }) => {
  const data_to_send = {
    name: "Sakura Fineliner MICRON 005 Black",
    data: {
      type: "fineliner",
      color: "black",
      price: 7,
    },
  };
  const response = await request.post("https://api.restful-api.dev/objects", {
    data: data_to_send,
  });
  const body = await response.json();
  expect(response.ok()).toBeTruthy();
  expect(body.name).toContain("Sakura Fineliner MICRON 005 Black");
  expect(typeof body.data).toBe("object");
  console.log(body);
  expect(body).toEqual(expect.objectContaining(data_to_send));
});

test("API Update", async ({ request }) => {
  // Wrongly sent data
  const data__typoed = {
    name: "Wrong text here",
    data: {
      type: "Not good",
      color: "bluyellow",
      price: 64564684,
    },
  };
  // Data that should be on the DB
  const data_good = {
    name: "Good name",
    data: {
      type: "Good",
      color: "yellow",
      price: 23,
    },
  };

  // Setup
  const response = await request.post("https://api.restful-api.dev/objects", {
    data: data__typoed,
  });
  const setup_body = await response.json();
  expect(response.ok()).toBeTruthy();
  expect(setup_body).not.toEqual(expect.objectContaining(data_good));

  // Test
  const update_response = await request.put(
    `https://api.restful-api.dev/objects/${setup_body.id}`,
    { data: data_good }
  );
  const updated_body = await update_response.json();
  expect(update_response.ok()).toBeTruthy();
  expect(updated_body).toEqual(expect.objectContaining(data_good));
});
