/*
The modal will pop up when scrolled into the bottom 10% and can be closed with a button click or clicking away. I made it so that a user would have to scroll out of the bottom 10% and scroll back down to trigger the modal opening again. That way, the user isn't bombarded by the modal when closing it and trying to scroll again.

I optimized the modal for 2 products in the cart. The user will be only be shown the images of 2 carted products in the modal. The modal would become very messy if many more products were also shown. However, the modal will notify the user that there are more products in the cart. This code would have to be changed to account for the difference in number of images if we wanted to make it dynamic.

Note that I distinguished between products and items in this snippet. I did not want the user to expect to see more than 2 products in the cart if that's how many there are. I also didn't want the header of the modal to not match the cart badge in quantity of items.

If there are less than 2 products in the cart, the modal popping up won't be triggered. It wouldn't make sense to have this particular modal to show up with nothing carted. We also probably don't want to bombard a low-intent user with only 1 product carted.

I chose to use subtotal, because the total can change once the user goes to edit the shipping address and method.

I used the same buttons from the site itself, and I matched the color scheme of the modal to the site.

There is minimal dynamic styling for window resizing.
*/

var scrolledDown = false;

var modal = document.createElement('div');
document.body.appendChild(modal);
modal.style = `display:none;
  position:fixed;
  z-index:1;
  left:0;
  top:0;
  height:100%;
  width:100%;
  overflow:auto;
  background-color:rgba(0,0,0,0.5);`;

var modalContent = document.createElement('div');
modal.appendChild(modalContent);
modalContent.style = `background-color:#FFFFFF;
  margin:20% auto;
  width:50%;
  min-width:250px;
  max-width:400px;
  box-shadow:0 6px 8px 0 rgba(0,0,0,0.2),0 7px 20px 0 rgba(0,0,0,0.2);`;

var modalHeader = document.createElement('div');
var quantity = document.getElementsByClassName('minicart-quantity')[0].innerText;
modalContent.appendChild(modalHeader);
modalHeader.style = `background:#DE0000; padding:15px; color:#FFFFFF; display:flex; justify-content:space-between`;
modalHeader.innerHTML = `<b style="margin:0; font-size:large;">You have ${quantity} items in your cart</b>`;

var closeBtn = document.createElement('button');
modalHeader.appendChild(closeBtn);
closeBtn.style = 'margin:0; float:right;';
closeBtn.innerHTML = `<svg aria-hidden="true" class="svg-icon svg-icon-close" width="20" height="22"><path d="M1.143 22L10 12.257 18.857 22 20 20.743 11.143 11 20 1.257 18.857 0 10 9.743 1.143 0 0 1.257 8.857 11 0 20.743z"></path></svg>`;

var modalBody = document.createElement('div');
modalContent.appendChild(modalBody);
modalBody.style = `padding:10px 20px 0px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-flow:row wrap;`;

var productImages = document.querySelectorAll('.mini-cart-products img');
var productCount = productImages.length;
if (productCount > 1) {
  for (var i = 0; i < 2; i++) {
    modalBody.appendChild(productImages[i]);
  }
}

var subtotal = document.querySelectorAll('.order-subtotal td')[1];
var text = document.createElement('div');
var p1 = document.createElement('p');
var p2 = document.createElement('p');
var br = document.createElement('br');
p1.innerText = '...and more in your cart';
p2.innerText = `Subtotal: ${subtotal && subtotal.innerText}`;
if (productCount > 2) {
  text.appendChild(p1);
}
text.appendChild(br);
text.appendChild(p2);
modalBody.appendChild(text);

var modalFooter = document.createElement('div');
modalContent.appendChild(modalFooter);
modalFooter.style = 'display:flex; justify-content:flex-end';

var cartBtn = document.createElement('a');
cartBtn.style = 'margin:15px 15px;';
cartBtn.setAttribute('class', 'primary-button');
cartBtn.setAttribute('href', 'https://www.marmot.com/cart/');
cartBtn.innerText = 'View Cart';
modalFooter.appendChild(cartBtn);

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function clickAway(event) {
  if (event.target === modal) {
    closeModal();
  }
}

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickAway);
window.addEventListener('scroll', function () {
  var scrollPosition = window.scrollY;
  var scrollMaxHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  if (!scrolledDown && scrollPosition >= scrollMaxHeight * 0.9) {
    if (productCount > 1) {
      openModal();
    }
    scrolledDown = true;
  } else if (scrolledDown && scrollPosition < scrollMaxHeight * 0.9) {
    scrolledDown = false;
  }
});
