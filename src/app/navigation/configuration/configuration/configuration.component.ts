import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  private _xRedmineApiKey: string;

  get xRedmineApiKey() {
    return this._xRedmineApiKey;
  }

  set xRedmineApiKey(xRedmineApiKey) {
    this._xRedmineApiKey = xRedmineApiKey;
    this.configurationService.setXRedmineApiKey(this._xRedmineApiKey);
  }

  constructor(private configurationService: ConfigurationService) {
  }

  ngOnInit() {
    this._xRedmineApiKey = this.configurationService.getXRedmineApiKey();
  }


}
