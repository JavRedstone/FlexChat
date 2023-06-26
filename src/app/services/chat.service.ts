import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Performs the get function
   * @param serviceUrl string
   * @returns Observable<any>
   */
  public doGet(modelUrl: string): Observable<any> {
    return this.httpClient.get<any>(environment.API_URL + modelUrl);
  }

  /**
   * Performs the post function
   * @param serviceUrl string
   * @param payload any
   * @returns Observable<any>
   */
   public doPost(modelUrl: string, text: any): Observable<any> {
    var payload = {
      inputs: {
        text: text
      }
    };
    var header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + environment.HUGGINGFACE_TOKEN)
    };
    return this.httpClient.post<any>(environment.API_URL + modelUrl, payload, header);
  }
}
