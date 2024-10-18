import { expect, request } from "@playwright/test";
import { fail } from "assert";

type DataObject = { name: string; data: object };

export class Utilities {
  async create_an_entry(api_url: string, data_to_post: DataObject) {
    const url_regex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    if (!api_url.match(url_regex)) {
      fail(new TypeError("A valid HTTP/HTTPS url was not provided"));
    }

    if (typeof data_to_post != "object") {
      fail(new TypeError("An object must be provided"));
    }

    const post_context = await request.newContext({ baseURL: api_url });
    const response = await post_context.post(
      "https://api.restful-api.dev/objects",
      {
        data: data_to_post,
      }
    );
    const body = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(body.name).toContain(data_to_post.name);
    expect(typeof body.data).toBe("object");
    expect(body).toEqual(expect.objectContaining(data_to_post));
    return body.id;
  }

  async delete_element(api_url: string, element_id: string) {
    const url_regex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    if (!api_url.match(url_regex)) {
      fail(new TypeError("A valid HTTP/HTTPS url was not provided"));
    }
    if (typeof element_id != "string" || element_id === null) {
      fail(new TypeError("A valid element id must be provided"));
    }

    const delete_context = await request.newContext({
      baseURL: api_url,
    });
    const response = await delete_context.delete(`${api_url}${element_id}`);
    const parsed_delete = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(parsed_delete).toEqual(
      expect.objectContaining({
        message: `Object with id = ${element_id} has been deleted.`,
      })
    );
  }
}
