# Swag Labs Test Plan

## Application Overview

Test the Swag Labs e-commerce demo at https://www.saucedemo.com/ using its published test accounts. The plan covers authentication, inventory and dynamic catalog behavior, cart state, checkout, order completion, and session controls. Use a fresh browser context for each scenario. Standard account: standard_user / secret_sauce. Other documented usernames include locked_out_user, problem_user, performance_glitch_user, error_user, and visual_user.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Valid user can log in

**File:** `tests/authentication/valid-login.spec.ts`

**Steps:**
  1. Open the login page and enter standard_user and secret_sauce.
    - expect: Both credential fields accept input.
  2. Submit the Login form.
    - expect: The browser navigates to the inventory page.
    - expect: The Products heading and the six standard inventory products are visible.

#### 1.2. Login validates missing credentials

**File:** `tests/authentication/required-credentials.spec.ts`

**Steps:**
  1. Submit the Login form with both fields empty.
    - expect: An inline error is shown identifying that the username is required.
  2. Dismiss the error, enter standard_user, leave the password empty, and submit again.
    - expect: An inline error is shown identifying that the password is required.
    - expect: The user remains on the login page.

#### 1.3. Invalid credentials are rejected

**File:** `tests/authentication/invalid-credentials.spec.ts`

**Steps:**
  1. Enter an unrecognized username and an incorrect password, then submit Login.
    - expect: An authentication error states that the username and password do not match a user.
    - expect: The user remains on the login page.

#### 1.4. Locked-out account cannot log in

**File:** `tests/authentication/locked-out-user.spec.ts`

**Steps:**
  1. Enter locked_out_user and secret_sauce, then submit Login.
    - expect: An error explains that the user has been locked out.
    - expect: The user remains on the login page.

### 2. Inventory and Product Catalog

**Seed:** `tests/seed.spec.ts`

#### 2.1. Inventory displays product cards

**File:** `tests/inventory/product-list.spec.ts`

**Steps:**
  1. Log in as standard_user.
    - expect: The inventory page displays six products, each with a name, description, price, image, and Add to cart control.

#### 2.2. Products can be sorted by name and price

**File:** `tests/inventory/product-sorting.spec.ts`

**Steps:**
  1. Log in as standard_user and inspect the default sort order.
    - expect: Name (A to Z) is selected and product names are in ascending order.
  2. Select Name (Z to A), then Price (low to high), then Price (high to low).
    - expect: Each selection changes the product order to match the selected sort.
    - expect: The lowest-priced item leads the low-to-high order and the highest-priced item leads the high-to-low order.

#### 2.3. Product details open and return to inventory

**File:** `tests/inventory/product-details.spec.ts`

**Steps:**
  1. Log in and open the Sauce Labs Backpack details.
    - expect: The detail page shows the backpack image, name, description, price, and Add to cart control.
  2. Select Back to products.
    - expect: The inventory page is displayed again.

#### 2.4. Product can be added from inventory

**File:** `tests/inventory/add-product.spec.ts`

**Steps:**
  1. Log in and add Sauce Labs Backpack to the cart.
    - expect: The cart badge shows one item.
    - expect: The product control changes to Remove.

#### 2.5. Reset App State clears cart contents

**File:** `tests/inventory/reset-state.spec.ts`

**Steps:**
  1. Log in, add a product, open the menu, and choose Reset App State.
    - expect: The cart badge is empty and product controls return to Add to cart.

### 3. Cart and Checkout

**Seed:** `tests/seed.spec.ts`

#### 3.1. Cart shows added products and supports removal

**File:** `tests/cart/cart-content.spec.ts`

**Steps:**
  1. Log in and add Sauce Labs Backpack and Sauce Labs Bike Light.
    - expect: The cart badge shows two items.
  2. Open the cart and remove the Bike Light.
    - expect: The cart shows only the Backpack.
    - expect: The cart badge updates to one item.

#### 3.2. Continue Shopping preserves cart contents

**File:** `tests/cart/continue-shopping.spec.ts`

**Steps:**
  1. Add a product and open the cart.
    - expect: The cart contains the selected product.
  2. Select Continue Shopping.
    - expect: The inventory page is displayed and the cart still contains the product.

#### 3.3. Empty cart shows no products and retains checkout controls

**File:** `tests/cart/empty-cart.spec.ts`

**Steps:**
  1. Log in and open the cart without adding products.
    - expect: The cart contains no product rows and the Checkout button remains visible.

#### 3.4. Checkout requires customer information

**File:** `tests/checkout/required-information.spec.ts`

**Steps:**
  1. Add a product, open the cart, and select Checkout.
    - expect: The Checkout: Your Information form displays First Name, Last Name, and Zip/Postal Code fields.
  2. Submit Continue with all fields empty.
    - expect: An inline error reports that First Name is required.
    - expect: The checkout does not advance.

#### 3.5. Checkout can be cancelled

**File:** `tests/checkout/cancel-checkout.spec.ts`

**Steps:**
  1. Add a product, open the cart, select Checkout, and choose Cancel.
    - expect: The order is not submitted and the user returns to the cart with the product still present.

#### 3.6. User can complete an order

**File:** `tests/checkout/complete-order.spec.ts`

**Steps:**
  1. Add Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: The Checkout: Your Information form is displayed.
  2. Enter Pat, Tester, and 12345 in the customer information fields, then select Continue.
    - expect: The overview lists the Backpack at $29.99, SauceCard #31337, and Free Pony Express Delivery.
  3. Verify the price summary.
    - expect: The item total is $29.99, tax is $2.40, and total is $32.39.
  4. Select Finish.
    - expect: The completion page shows Thank you for your order! and the dispatch confirmation.
    - expect: The cart is empty.
  5. Select Back Home.
    - expect: The user returns to the inventory page.

#### 3.7. Checkout validates Last Name and Postal Code

**File:** `tests/checkout/required-last-name-and-postal-code.spec.ts`

**Steps:**
  1. Add a product, open the cart, select Checkout, enter a First Name, and select Continue.
    - expect: An inline error reports that Last Name is required.
    - expect: The checkout does not advance.
  2. Enter a Last Name and select Continue without entering a Zip/Postal Code.
    - expect: An inline error reports that Postal Code is required.
    - expect: The checkout does not advance.

#### 3.8. Cancelling the order overview preserves the cart

**File:** `tests/checkout/cancel-order-overview.spec.ts`

**Steps:**
  1. Add a product, complete the customer information step, and reach Checkout: Overview.
    - expect: The overview displays the selected product and its price.
  2. Select Cancel.
    - expect: The user returns to the inventory page without completing the order.
    - expect: The cart still contains the selected product.

#### 3.9. Order overview calculates totals for multiple products

**File:** `tests/checkout/multiple-product-totals.spec.ts`

**Steps:**
  1. Add Sauce Labs Backpack ($29.99) and Sauce Labs Bike Light ($9.99), then proceed through checkout using valid customer information.
    - expect: The overview lists both products.
    - expect: The item total is $39.98, tax is $3.20, and total is $43.18.

### 4. Dynamic Catalog

**Seed:** `tests/seed.spec.ts`

#### 4.1. Lazy-loaded catalog adds more products

**File:** `tests/dynamic-catalog/lazy-load.spec.ts`

**Steps:**
  1. Log in, open the menu, choose Dynamic Catalog, then Lazy Load.
    - expect: The Dynamic Catalog - Lazy Load page initially shows catalog items and loading placeholders.
  2. Scroll down through the catalog and wait for additional content.
    - expect: Additional product variants load as the user scrolls.
    - expect: Loading placeholders are replaced by product entries.

#### 4.2. Spinner catalog finishes loading

**File:** `tests/dynamic-catalog/spinner.spec.ts`

**Steps:**
  1. Open Dynamic Catalog - Spinner from the menu.
    - expect: A Loading status is shown while the catalog is being fetched.
  2. Wait for loading to finish.
    - expect: The loading status disappears and six product entries with names and prices are displayed.

#### 4.3. Slider selection updates product details

**File:** `tests/dynamic-catalog/slider.spec.ts`

**Steps:**
  1. Open Dynamic Catalog - Slider from the menu.
    - expect: A product image, name, and price are shown with buttons for six products.
  2. Select Show Sauce Labs Backpack.
    - expect: The displayed image, name, and price correspond to Sauce Labs Backpack ($29.99).

### 5. Session Management

**Seed:** `tests/seed.spec.ts`

#### 5.1. User can log out

**File:** `tests/session/logout.spec.ts`

**Steps:**
  1. Log in, open the navigation menu, and select Logout.
    - expect: The login page is displayed and the username and password fields are empty.
