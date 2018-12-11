import { Component, OnInit } from '@angular/core';
import { RedmineIndicatorsService } from '../../services/redmine-indicators.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  private _xRedmineApiKey: string;
  private _backendUrl: string;

  get xRedmineApiKey() {
    return this._xRedmineApiKey;
  }

  get backendUrl() {
    return this._backendUrl;
  }

  set xRedmineApiKey(xRedmineApiKey) {
    this._xRedmineApiKey = xRedmineApiKey;
    this.redmineIndicatorsService.setXRedmineApiKey(this._xRedmineApiKey);
  }

  set backendUrl(backendUrl) {
    this._backendUrl = backendUrl;
    this.redmineIndicatorsService.setBackendUrl(this._backendUrl);
  }

  constructor(private redmineIndicatorsService: RedmineIndicatorsService) {
  }

  ngOnInit() {
    this._xRedmineApiKey = this.redmineIndicatorsService.getXRedmineApiKey();
    this._backendUrl = this.redmineIndicatorsService.getBackendUrl();
  }


}
