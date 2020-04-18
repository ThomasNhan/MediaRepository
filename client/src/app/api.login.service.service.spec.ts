import { TestBed } from "@angular/core/testing";

import { LoginService } from "./api.login.service";

describe("Api.Login.ServiceService", () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
