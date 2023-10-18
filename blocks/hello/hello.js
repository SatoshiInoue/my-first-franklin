import { h, render } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';

const html = htm.bind(h);

const Hello = (props) => {
  return html`${props.data.children.map((row) =>
    row.children
      ? row.children.map((col) => html`<p>${col.textContent}</p>`)
      : html`<p class="hello2">${row.textContent}</p>`
  )} `;
};

export default function decorate(block) {
  const json = blockToJson(block);
  block.textContent = '';
  render(html`<${Hello} data=${json} />`, block);
}

const blockToJson = (block) => {
  var json = {};
  block.getAttributeNames().forEach((attr) => {
    json[attr] = block.getAttribute(attr);
  });
  json['children'] = [];
  appendChildren(block.children, json.children);
  return json;
};
const appendChildren = (children, items) => {
  [...children].forEach((child) => {
    var item = {};
    child.getAttributeNames().forEach((attr) => {
      json[attr] = child.getAttribute(attr);
    });
    if (child.childElementCount > 1) {
      item['children'] = [];
      appendChildren(child.children, item.children);
    } else if (child.childElementCount === 1) {
      item['textContent'] = child.firstElementChild.textContent;
    } else {
      item['textContent'] = child.textContent;
    }
    items.push(item);
  });
};
