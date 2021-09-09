// ------------------- ex 5 -------------------

let i ='2020-11-26';
let date = i.split('T');
console.log(date[0].split('-').reverse().join('.'))

// ------------------- ex 6 -------------------

const data = [
    {
      country: 'Russia',
      city: 'Saint Petersburg',
      hotel: 'Hotel Leopold',
    },
    {
      country: 'Spain',
      city: 'Santa Cruz de Tenerife',
      hotel: 'Apartment Sunshine',
    },
    {
      country: 'Slowakia',
      city: 'Vysokie Tatry',
      hotel: 'Villa Kunerad',
    },
    {
      country: 'Germany',
      city: 'Berlin',
      hotel: 'Hostel Friendship',
    },
    {
      country: 'Indonesia',
      city: 'Bali',
      hotel: 'Ubud Bali Resort&SPA',
    },
    {
      country: 'Netherlands',
      city: 'Rotterdam',
      hotel: 'King Kong Hostel',
    },
    {
      country: 'Marocco',
      city: 'Ourika',
      hotel: 'Rokoko Hotel',
    },
    {
      country: 'Germany',
      city: 'Berlin',
      hotel: 'Hotel Rehberge Berlin Mitte',
    },
  ];

const searchCountryInfo = str => {
	let res = [];
	
	for (let i = 0; i < data.length; i++) {
		const currentInfo = `${data[i].country} ${data[i].city} ${data[i].hotel}`.toLowerCase();
		
		if (currentInfo.includes(str)) {
			res.push(data[i]);
		}
	}
	return res;
}
let searchValue = prompt('please type info').toLowerCase().trim();
console.log(searchCountryInfo(searchValue));


// const res = data.filter(item => Object.values(item).some(val => val.toLowerCase().trim().includes(searchValue)));
// let searchValue = prompt('please type info').toLowerCase().trim();
// console.log(res);

