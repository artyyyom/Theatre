import { Component, OnInit, OnDestroy } from '@angular/core';
import { Seances } from '../../shared/models/seances.model';
import { Subscription } from 'rxjs/Subscription';
import { SeancesService } from '../../shared/services/seances.service';
import { SharedService } from '../../shared/shared.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';

const months = [
  {
    name: 'Январь',
    code: '01'
  },
  {
    name: 'Февраль',
    code: '02'
  },
  {
    name: 'Март',
    code: '03'
  },
  {
    name: 'Апрель',
    code: '04'
  },
  {
    name: 'Май',
    code: '05'
  },
  {
    name: 'Июнь',
    code: '06'
  },
  {
    name: 'Июль',
    code: '07'
  },
  {
    name: 'Август',
    code: '08'
  },
  {
    name: 'Сентябрь',
    code: '09'
  },
  {
    name: 'Октябрь',
    code: '10'
  },
  {
    name: 'Ноябрь',
    code: '11'
  },
  {
    name: 'Декабрь',
    code: '12'
  },
];


@Component({
  selector: 'app-admin-seances',
  templateUrl: './admin-seances.component.html',
  styleUrls: ['./admin-seances.component.css']
})

export class AdminSeancesComponent implements OnInit, OnDestroy {
  months = months;
  monthSelect;
  displayMonthReport: boolean = false;
  isSuccess: boolean = false;
  isError:boolean = false;
  seances: Seances[];
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  isLoad: boolean = false;
  search: string = '';
  dataTemplate = [];
  constructor(private seancesService: SeancesService,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.monthSelect = this.months[0];
    this.sub1 = this.seancesService.getSeances()
      .subscribe(data => {
        this.seances = data;
        this.isLoad = true;
      });
  }
  deleteSeance(id) {
    this.isLoad = false;
    this.sub2 = this.seancesService.deleteSeance(id)
      .subscribe(data => {
        this.seances = this.sharedService.delElArray(this.seances, id);
        this.isSuccess = true;
        this.isLoad = true;
        setTimeout(() => this.isSuccess = false, 4000);
      },error =>{
        this.isError = true;
        this.isLoad = true;
        setTimeout(() => this.isError = false, 4000);
      });
    
  }
  genereteReportMonth(data: any) {
    let pipe = new DatePipe('ru'); // Use your own locale
    let datetime;
    let template = '';
    let formattedDate;
    let formattedTime;
    let dataRow = [];
    for(var d in data) {
      if(data[d].performance) {
      console.log(data[d]);
      datetime = new Date(data[d].datetime);
      formattedDate = pipe.transform(datetime, 'dd MMMM yyyy');
      formattedTime = pipe.transform(datetime, 'HH:ss');
      
      dataRow.push('Драматический театр г. Мариуполя');
      dataRow.push({text: `Отчет по продаже билетов на ${formattedDate}`, style: 'header', alignment: 'center'});
      dataRow.push(`Время: ${formattedTime}.`);
      if(data[d].performance)
        dataRow.push(`Cпектакль: ${data[d].performance.name}.`);
      if(data[d].stage)
        dataRow.push(`Сцена ${data[d].stage.name}`);
      dataRow.push('Текущий статус билетов');
      dataRow.push({style: 'tableExample', 
                    table: {body: [[`Количество забронированных билетов ${data[d].order}`],
                                  [`Количество проданных билетов ${data[d].buy}`],
                                  [`Общая сумма выручки ${data[d].sum/1000}`]]}});
      dataRow.push('Отчет составил _________________',
      {text: 'Подпись ___________', margin: [0, 10, 0, 5]});
      dataRow.push({text: 'Дата ___________', margin: [0, 5, 0, 5], pageBreak: 'after'})
    }
  }
    
    return dataRow;
  }
  pdfGeneratorReportMonth(month) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.sub3 = this.seancesService.getReportSalesMonth(this.monthSelect)
      .subscribe(data => {
        console.log(data);
        var dd = { 
          content: [
            this.genereteReportMonth(data),
            'Драматический театр г. Мариуполя',
            {text: `Отчет по продаже билетов за ${this.monthSelect.name}`, style: 'header', alignment: 'center'},
            'Текущий статус билетов:',
            {
              style: 'tableExample',
              table: {
                body: [
                  [`Количество забронированных билетов ${data.order}`],
                  [`Количество проданных билетов ${data.buy}`],
                  [`Общая сумма выручки ${data.sum/1000} грн.`],
                ]
              }
            },
            'Отчет составил _________________',
            {text: 'Подпись ___________', margin: [0, 10, 0, 5]},
            {text: 'Дата ___________', margin: [0, 5, 0, 5]}
            
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 10, 0, 10]
            },
            subheader: {
              fontSize: 14,
              bold: true,
              margin: [0, 5, 0, 10]
            },
            tableExample: {
              margin: [0, 5, 0, 15]
            },
            tableHeader: {
              bold: true,
              fontSize: 13,
              color: 'black'
            }
          },  
           
        }
        pdfMake.createPdf(dd).download(`ticket.pdf`);
      })
  }
  ngOnDestroy() {
    if(this.sub1)
      this.sub1.unsubscribe();
    if(this.sub2) 
      this.sub2.unsubscribe();
  }

}
