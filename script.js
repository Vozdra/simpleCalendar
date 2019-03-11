let domElemMainDiv = document.createElement('div');
domElemMainDiv.classList.add('mainDiv');
document.body.appendChild(domElemMainDiv);

let domElemThisYear = document.createElement('div');
domElemThisYear.classList.add('thisYear');
domElemMainDiv.appendChild(domElemThisYear);

// A function that determines how many days in a month
Date.prototype.daysInMonth = function(month) {
  let numberDays = 0;
  for (let i = 2; i < 33; i++) {
    let day = new Date(this.getFullYear(), month, i).getDate();
    if (day === 1) return ++numberDays;
    numberDays++;
  }
};

// Creating an object of a specific year and month
function CreatingMonth(year, month) {
  let objDate = new Date(year, month);
  this.numDays = objDate.daysInMonth(month);
  this.dayWeekId = objDate.getDay(1);
  this.monthName = CreatingMonth.prototype.monthYear[month];
}
CreatingMonth.prototype = {
  monthYear: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
  daysWeek: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
  constructor: CreatingMonth
};

// Creating cells: one cell (<table> in html) - one specific month of the year
let allMonth = [], // all 12 month in the year
    allElemTd = [], // will contain collection of the <td> elements (<td> value is a specific day of a specific month)
    animalsYear = {
      2019: 'img-animals/pig.jpg',
      2018: 'img-animals/dog.jpg',
      2017: 'img-animals/rooster.jpg',
      2016: 'img-animals/monkey.jpg',
      2015: 'img-animals/goat.jpg',
      2014: 'img-animals/horse.jpg',
      2013: 'img-animals/snake.jpg',
      2012: 'img-animals/dragon.jpg',
      2011: 'img-animals/rabbit.jpg',
      2010: 'img-animals/tiger.jpg',
      2009: 'img-animals/bull.jpg',
      2008: 'img-animals/rat.jpg'
    },
    domElemTable,
    defaultYear = new Date().getFullYear(),
    domElemTdDay;

let domElemYearDisplay = document.createElement('div');
let domElemYearDisplayH1 = document.createElement('h1');
let domElemYearDisplayInput = document.createElement('input');
let domElemYearDisplayButton = document.createElement('button');

domElemYearDisplay.appendChild(domElemYearDisplayH1);
domElemYearDisplay.appendChild(domElemYearDisplayInput);
domElemYearDisplay.appendChild(domElemYearDisplayButton);
document.body.insertBefore(domElemYearDisplay, domElemMainDiv);

domElemYearDisplay.classList.add('yearDisplay');
domElemYearDisplayInput.type = 'text';
domElemYearDisplayInput.id = 'inputYearEnter';
domElemYearDisplayInput.maxLength = '4';
domElemYearDisplayInput.placeholder = 'Введите интересующий вас год';
domElemYearDisplayButton.innerHTML = 'Отобразить календарь';
domElemYearDisplayH1.innerHTML = defaultYear + ' год';
document.body.style.backgroundImage = `url(`+ animalsYear[defaultYear]+`)`;

domElemYearDisplayInput.addEventListener('change', function() {

  let val = domElemYearDisplayInput.value,
      imgBg

  if (!isNaN(parseFloat(val)) && isFinite(val)) {
    for (let key in animalsYear) {  
      if (!(Math.abs(key - val) % 12)) {
        imgBg = animalsYear[key];
        break;
      }
      
    }

    domElemYearDisplayH1.innerHTML = val + ' год';
    document.body.style.backgroundImage = `url(`+ imgBg +`)`;
    domElemYearDisplayInput.value = '';
    defaultYear = val;
    
    let domElemTable = document.getElementsByClassName('oneMonth');
    while(domElemTable.length > 0){
      domElemTable[0].parentNode.removeChild(domElemTable[0]);
    }

    generateYear(defaultYear);

  } else {
    alert('Введите корректное значение года!')
  }

})

generateYear(defaultYear);

function generateYear(year) {
  for (let i = 0; i < 12; i++) {
    // Creating an object for each month of the year
    allMonth[i] = new CreatingMonth(defaultYear, i);
  
    domElemTable = document.createElement('table');
    domElemTable.classList.add('oneMonth');
    domElemMainDiv.appendChild(domElemTable);
    
    let domElemCaption = document.createElement('caption');
    domElemCaption.classList.add('monthName');
    domElemCaption.innerHTML = allMonth[i].monthName;
    domElemTable.appendChild(domElemCaption);
  
    // <tr> which is intended to display the days of the week (<th>)
    let domElemTrDayWeek = document.createElement('tr');
    domElemTrDayWeek.classList.add('trDayWeek');
    domElemTable.appendChild(domElemTrDayWeek);
  
    // <th> will contain values - days of the week (Пн, Вт, Ср, ...)
    for (let j = 0; j < 7; j++) {
      let domElemThDayWeek = document.createElement('th');
      domElemThDayWeek.classList.add('thDayWeek');
      domElemThDayWeek.innerHTML = allMonth[i].daysWeek[j];
      domElemTrDayWeek.appendChild(domElemThDayWeek);
    }
  
    // <tr> which is intended to display a specific day(<td>) of a specific month
    for (let j = 0; j < 6; j++) {
      let domElemTrDay = document.createElement('tr');
      domElemTrDay.classList.add('trDay');
      domElemTable.appendChild(domElemTrDay);
  
      // <td> will contain value - specific day of month (1, 2, 3, ...)
      for (let j = 0; j < 7; j++) {
        domElemTdDay = document.createElement('td');
        domElemTdDay.classList.add('tdDay-'+i);
        domElemTrDay.appendChild(domElemTdDay);
      }
  
    }
    
    allElemTd[i] = document.getElementsByClassName(`tdDay-${i}`); // get collection of the <td> elements
  
    // Set the corresponding value in each element <td>.
    for (let q = 0; q < allElemTd[i].length; q++) {
      let n = allMonth[i].numDays;
      let startPos = (allMonth[i].dayWeekId == 0 ? 7 : allMonth[i].dayWeekId) - 1;
          
      for (let j = 0; j < allMonth[i].numDays; j++) {
          allElemTd[i][startPos].innerHTML = allMonth[i].numDays - (n-1);
          startPos++;
          n--;
      }
    }
  }
}

// Adding values ​​from previous and next month
for (let i = 0; i < allMonth.length; i++) {
  let IdprevMonth = i == 0 ? 11 : i - 1;
  let prevMonth = allMonth[IdprevMonth];

  let cellsPrevMonth = (allMonth[i].dayWeekId == 0 ? 7 : allMonth[i].dayWeekId) - 1;
  let endPos = allMonth[i].numDays + cellsPrevMonth;
  let numberTr = Math.ceil(endPos / 7);
  let cellsNextMonth = (numberTr*7) - endPos;

  for (let j = 0; j < cellsPrevMonth; j++) {
    allElemTd[i][j].innerHTML = prevMonth.numDays - (cellsPrevMonth - (j+1));
    allElemTd[i][j].classList.add('prevMonth');
  }

  for (let j = 0; j < cellsNextMonth; j++) {
    let x = 1;
    for (let k = endPos; k < numberTr*7; k++) {
      allElemTd[i][k].innerHTML = x;
      allElemTd[i][k].classList.add('nextMonth');
      x++;
    }
  }   

}