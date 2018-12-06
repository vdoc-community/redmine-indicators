import {Component, OnInit} from '@angular/core';
import {RedmineIndicatorsService} from '../../services/redmine-indicators.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  public _xRedmineApiKey;

  get xRedmineApiKey() {
    return this._xRedmineApiKey;
  }

  set xRedmineApiKey(xRedmineApiKey) {
    this._xRedmineApiKey = xRedmineApiKey;
    this.redmineIndicatorsService.setXRedmineApiKey(this._xRedmineApiKey);
  }

  constructor(private redmineIndicatorsService: RedmineIndicatorsService) {
  }

  ngOnInit() {
    this._xRedmineApiKey = this.redmineIndicatorsService.getXRedmineApiKey();
  }


}
