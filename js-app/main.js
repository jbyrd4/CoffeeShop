const url = "https://localhost:5001/api/beanvariety/";

const main = document.querySelector(".coffeeShop");
const button = document.querySelector("#run-button");
const button2 = document.querySelector("#form-button");

const beanForm = () => {
  let html = `
  <div class="field">
      <label class="label" for="beanName">Bean Name</label>
      <input type="string" name="beanName" class="input"/>
      </div>
  <br>
  <div class="field">
  <label class="label" for="beanRegion">Bean Region</label>
  <input type="string" name="beanRegion" class="input"/>
  </div>
  <br>
  <div class="field">
  <label class="label" for="beanNotes">Bean Notes</label>
  <input type="string" name="beanNotes" class="input"/>
  </div>
  <br>
  <button class="button button__submit" id="submit">Submit New Bean</button>
  `;
  
  return html;
};

const sendRequest = (bean) => {
  const fetchOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(bean)
    }
    return fetch(url, fetchOptions)
    .then(response => response.json())
    .then(() => {
      main.innerHTML = beanForm();
    })
}

main.innerHTML = beanForm();

document.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "submit") {
    const beanName = document.querySelector("input[name='beanName']").value
    const beanRegion = document.querySelector("input[name='beanRegion']").value
    const beanNotes = document.querySelector("input[name='beanNotes']").value

    const dataToSendToApi = {
      name: beanName,
      region: beanRegion,
      notes: beanNotes
    }
    sendRequest(dataToSendToApi)
  }
})

button.addEventListener("click", () => {
  fetch(url)
    .then((res) => res.json())
    .then((beanVarieties) => {
      main.innerHTML = beanVarieties.map((bean) => `<div>${bean.name}</div>`);
    });
});

button2.addEventListener("click", () => {
  main.innerHTML = beanForm();
});