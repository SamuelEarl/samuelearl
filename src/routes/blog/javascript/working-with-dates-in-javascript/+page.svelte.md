# Working with Dates in JavaScript

Working with dates can get confusing. Depending on the time of day or the timezone in which your browser or server are located or whether you are working in a browser or in a Node.js environment, you could see different dates and times in the Date objects. Why is that? This page is an attempt to demystify the JavaScript Date object and to provide some solutions to this confusing mess.

## Preliminary Information

* UTC is a way to track time and it forms the basis for time zones (it is the successor to Greenwich Mean Time). ISO 8601 is a standardized format that is used for datetime objects and has this format: `2019-11-14T00:55:31.820Z` (See [UTC vs ISO format for time](https://stackoverflow.com/a/58848028).) So you can think of UTC as a time zone and ISO 8601 as a standardized format for displaying dates and times.
* Browsers and servers use timestamps based on where they are located, so you can get conflicting datetime stamps due to that fact.
* You can use the `toISOString()` method to convert all datetime objects to UTC time in both your browser and on your server. The timezone for `toISOString()` is always UTC ([MDN `Date.prototype.toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)). This will preserve the datetime and it can easily be converted to a Date object. (See [Datetime difference on server and client side timezone](https://stackoverflow.com/a/35124409).)
* Make sure that servers only use and return a datetime in the standardized ISO 8601-format. You can then convert date objects to local time in the browser, if necessary. (See [Convert UTC date time to local date time](https://stackoverflow.com/questions/6525538/convert-utc-date-time-to-local-date-time)). This is sort of like the concept of having a single source of truth. For example, you can use ISO date strings as your single source of truth on the server and in your database and then convert those ISO strings to local time and to a specific format in a user's browser, if needed.
* Use the ISO 8601 format for dates ([UTC vs ISO format for time](https://stackoverflow.com/a/58848028)). JavaScript does not have ISO functions for working with date objects. JavaScript only has the `toISOString()` method that returns a date string in ISO format ([MDN `Date.prototype.toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)).
* You can use JavaScript's `Intl.DateTimeFormat()` method to format date objects into different locales, if necessary. Keep in mind that you will need to specifically set the `timeZone` option to `"UTC"` in order to preserve the UTC timezone.

## Recommendations

One idea is to convert all your (database) inputs and (browser) outputs involving dates to strings. If you need to manipulate a date, then you can convert it to an object, perform the manipulations, and then convert it back to a string before storing it in a database (an input) or displaying it in a browser (an output). For example:

1. **Inputs:** You can store dates in your database as ISO-formatted date strings in UTC time using the `toISOString()` method (an input).
3. **Outputs:** Before displaying the date string in the browser (an output), if you need to manipulate the date before displaying it in the browser, then you can:
    1. Convert the ISO-formatted date string to a Date object (with the local timezone) using the `new Date()` constructor.
    2. Create your own custom string from the Date object using UTC functions to get and/or set parts of the Date object in UTC time (e.g. `getUTCDate()`, `getUTCHours()`, `setUTCDate()`, `setUTCHours()`).
    3. Convert the date object to a string with a different timezone using one of the many JavaScript `toString` functions (e.g. `date.toLocaleDateString()`, `date.toLocaleString()`, `date.toLocaleTimeString()`).
    4. Use date formatting methods on the date object (e.g. `Intl.DateTimeFormat()`) or string methods on the ISO-formatted date string (e.g. `String.substring()`, `String.split()`) to create the date string that you need.

<br>

If you think of working with dates in terms of working with the string version of those dates, then you can avoid many of the pitfalls that are associated with Date objects. Remember that when creating or working with dates, it is probably best to always work with the UTC timezone and it is recommended to use the ISO format.

## Dates in Browsers vs Servers

It is important to understand that the implementation of Date between browsers and Node.js is different. For example, Node.js uses ISO-formatted Date objects set in the UTC timezone (see this [GitHub issue](https://github.com/nodejs/node/issues/9805#issuecomment-266484974)) while browsers use a Date object representing the date interpreted in the local timezone ([MDN Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)). There are a few things you can do to avoid these differences:

* Since strings do not get converted into different formats when transferred between different environments (browsers, servers, databasees), you can use the string version of Date objects instead of Date objects themselves. For example, the `toISOString()` method will work in both browsers and Node.js and is transferrable between both environments without any conversion or formatting issues. Just be aware that if you pass the result of the `toISOString()` method to a `new Date()` constructor, then you will get different results depending on the environment. 
* You can also use a library like [Moment.js](https://momentjs.com/) in both your frontend and backend code. You can then manage the format of your dates and you should have the same value in both environments.

Note that you can use UTC JavaScript methods (`date.setUTCHours()` instead of `date.setHours()`) in an effort to ensure that all datetime objects use UTC time, but that still won't work in browsers. The best options for working with dates inside browsers are the two options described above. However, in Node.js you can use UTC methods to get and set datetime objects in UTC time. You should use the UTC version of any date functions in Node.js when they are available.

Which ever option you choose, make sure to test your code and verify that it works as you expect.


## Examples

You can test these examples in a browser console or a Node REPL window (open a terminal window, type `node`, and press Enter) to see how they work and the results they return.


### Creating Date objects with UTC time and ISO format

In a browser the `new Date()` constructor will create a Date object that is evaluated to the local time zone. (See [Individual date and time component values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#individual_date_and_time_component_values) on the MDN `Date()` constructor page.) But in Node.js the `new Date()` constructor will create an ISO-formatted Date object with UTC time. So instead of creating a date with `new Date()`, you can do this:

```
// Browser: 
// This will create a date object with local timezone.
const localDateObj = new Date();

// Node:
// This will create a date object with UTC timezone and ISO format.
const isoDateObj = new Date();

// Browser & Node: 
// This will create a date string with UTC timezone and ISO format.
const isoDateString = new Date().toISOString();
```


In Node.js this will create a Date object that uses the UTC time zone and that is in ISO format. The `new Date().toISOString()` method will return a string representing this date in ISO format and the timezone is always UTC, as denoted by the suffix `Z` ([Date.prototype.toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)). Passing an ISO formatted date string to the `new Date()` constructor is standardized and will work reliably. (See [Several ways to create a Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#several_ways_to_create_a_date_object).)

You can also use one of these options to create a Date string or Date object with a specific date:

```
const dateString = "2024-01-15";

// Browser: 
// This will create a date object with the specified 
// date in the local timezone.
const localDateObj = new Date(dateString);

// Node: 
// This will create a date object with the specified 
// date in the UTC timezone and ISO format.
const isoDateObj = new Date(dateString);

// Browser & Node:
// This will create a date string with the specified date in 
// the UTC timezone and ISO format.
const isoDateString = new Date(dateString).toISOString();

// Note that the hours, minutes, seconds, and milliseconds will all be set to 0.
```

```
const today = new Date();

// The `getTime()` method returns the number of milliseconds for this
// date since midnight at the beginning of January 1, 1970, UTC.
const timestamp = today.getTime();

// Browser: 
// This will create a date object with the specified 
// timestamp in the local timezone.
const localDateObj = new Date(timestamp);

// Node: 
// This will create a date object with the specified 
// timestamp in the UTC timezone and ISO format.
const dateObj = new Date(timestamp);
```


### Set the time of a Date object in UTC time

Instead of using `setHours()` on a Date object, use the `setUTCHours()` method. This will work in browsers and Node.js. The `setUTCHours()` method will return a timestamp, but you can convert the timestamp into an ISO-formatted date string.

```
const today = new Date();

// Set `date` to the first millisecond of the date.
const morning = today.setUTCHours(0, 0, 0, 0);
// Returns a timestamp like this: 1738972800000

// Set `date` to the last millisecond of the date.
const night = today.setUTCHours(23, 59, 59, 999);
// Returns a timestamp like this: 1739059199999

// Convert the timestamps to an ISO-formatted date string.
new Date(morning).toISOString();
new Date(night).toISOString();
```
