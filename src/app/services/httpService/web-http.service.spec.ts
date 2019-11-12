import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { WebHttpService } from "./web-http.service";
import { environment } from "../../../environments/environment";

describe("WebHttpService", () => {
  let injector: TestBed;
  let service: WebHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WebHttpService]
    });

    injector = getTestBed();
    service = injector.get(WebHttpService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const dummyTokenResponse = { token: "1234-5678-9101" };

  it("POST(/token) should return token", () => {
    service.post("/token", {}).subscribe((res: any) => {
      expect(res.token).toBeTruthy();
    });

    const req = httpMock.expectOne(environment.apiUrl + "/token");
    expect(req.request.method).toBe("POST");
    req.flush(dummyTokenResponse);
  });

  it("should be created", () => {
    const service: WebHttpService = TestBed.get(WebHttpService);
    expect(service).toBeTruthy();
  });
});
