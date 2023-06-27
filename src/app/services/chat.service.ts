import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Model } from '../classes/model/model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private httpClient: HttpClient) {}

  public doGet(model: Model): Observable<any> {
    return this.httpClient.get<any>(environment.API_URL + model.url);
  }

  public doPost(model: Model, text: any): Observable<any> {
    let payload = {
      inputs: text
    };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.HUGGINGFACE_TOKEN}`
    });

    if (model.pipeline_tag == 'conversational') {
      payload = {
        inputs: {
          text: text
        }
      };

      return this.httpClient.post<any>(environment.API_URL + model.url, payload, { headers, responseType: 'json' });
    } else if (model.pipeline_tag == 'text-to-image') {
      payload = {
        inputs: text
      };

      return this.httpClient.post(environment.API_URL + model.url, payload, {
        headers,
        responseType: 'arraybuffer' // Set the response type to arraybuffer
      }).pipe(
        map((response: any) => {
          // Convert the response data into a Base64 encoded string
          const base64String = btoa(String.fromCharCode(...new Uint8Array(response)));

          // Prefix the Base64 string with the appropriate data URL prefix
          const imageUrl = `data:image/jpeg;base64,${base64String}`;
          
          return imageUrl;
        })
      );
    }

    return this.httpClient.post<any>(environment.API_URL + model.url, payload, { headers, responseType: 'json' });
  }
}
