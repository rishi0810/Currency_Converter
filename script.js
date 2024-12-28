async function populatedata() {
  try {
    const response = await fetch("currency_list.json");
    const data = await response.json();

    const datalist = document.getElementById("currencies");

    const currency_obj = data.currency;
    for (const [curr, code] of Object.entries(currency_obj)) {
      const option = document.createElement("option");
      option.value = curr;
      option.dataset.code = code;
      datalist.appendChild(option);
    }
  } catch (err) {
    console.error("Error Fetching JSON");
  }
}
populatedata();

document.querySelector(".action").addEventListener("click", async () => {
  const amount = parseFloat(document.querySelector("#amount").value);
  console.log(amount);
  const from_country = document.querySelector("#from_country");
  const to_country = document.querySelector("#to_country");
  const options = document.querySelectorAll("#currencies option");
  let in_curr_code = null;
  let out_curr_code = null;
  options.forEach((option) => {
    if (option.value == from_country.value) {
      in_curr_code = option.dataset.code;
    } else if (option.value == to_country.value) {
      out_curr_code = option.dataset.code;
    }
  });
  if (in_curr_code && out_curr_code) {
    console.log(in_curr_code);
    console.log(out_curr_code);
  } else console.error("No such country");

  const url =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

  const response = await fetch(`${url}${in_curr_code}.json`);
  const json_data = await response.json();
  const rate = json_data[in_curr_code][out_curr_code];
  let choice1 = document.querySelector(".choice1");
  choice1.textContent = `${amount} ${from_country.value}`;
  let content1 = document.querySelector(".con_rate");
  content1.textContent = ` = ${rate * amount} ${to_country.value}`;
  document.querySelector(".content-2").textContent = `1 ${out_curr_code} = ${
    1 / rate
  } ${in_curr_code}`;
  document
    .querySelector("a")
    .setAttribute(
      "href",
      `https://www.x-rates.com/table/?from=${in_curr_code}&amount=1`
    );
});
