# Working with Dates in JavaScript

(This page is a work in progress)

Working with dates can get confusing. Depending on the time of day or the timezone in which your browser or server are located or whether you are working in a browser or in a Node.js environment, you could see different dates and times in the Date objects. Why is that? This page is an attempt to demystify the JavaScript Date object and to provide some solutions to this confusing mess.

* UTC is a way to track time and it forms the basis for time zones (it is the successor to Greenwich Mean Time). ISO 8601 is a standardized format that is used for datetime objects and has this format: `2019-11-14T00:55:31.820Z` (https://stackoverflow.com/a/58848028). So you can think of UTC as a time zone and ISO as a standardized format for displaying dates and times.
* Browsers and servers use timestamps based on where they are located, so you can get conflicting datetime stamps due to that fact.
* You can use the `toISOString()` method to convert all datetime objects to UTC time in both your browser and on your server. The timezone for `toISOString()` is always UTC (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString). This will preserve the datetime and it can easily be converted to a Date object. See https://stackoverflow.com/a/35124409.
* Make sure that servers only use and return a datetime in the standardized ISO 8601-format (https://stackoverflow.com/a/31453408). You can then convert date objects to local time in the browser, if necessary (https://stackoverflow.com/questions/6525538/convert-utc-date-time-to-local-date-time). This idea reminds me of the concept of having a single source of truth. For example, you can use ISO date strings as your single source of truth on the server and in your database and then convert those ISO strings to local time and to a specific format in a user's browser, if needed.
* Use the ISO 8601 format for dates (https://stackoverflow.com/a/58848028). JavaScript does not have ISO functions for working with date objects. JavaScript only has the `toISOString()` method that returns a date string in ISO format (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).
* You can use JavaScript's `Intl.DateTimeFormat()` method to format date objects into different locales, if necessary. Keep in mind that you will need to specifically set the `timeZone` option to `"UTC"` in order to preserve the UTC timezone.

## Recommendations

One idea is to convert all your inputs and outputs involving dates to strings. If you need to manipulate a date, then you can convert it to an object, perform the manipulations, and then convert it back to a string before storing it in a database (an input) or displaying it in a browser (an output). For example:

1. Store dates in your database as ISO-formatted date strings in UTC time using the `toISOString()` method (an input).
2. When you retrieve the date string from the database:
    1. If you need to manipulate the date before displaying the date string in the browser:
        1. Then convert the ISO-formatted date string to a Date object and use JavaScript's UTC functions to set parts of the Date object (e.g. `setUTCDate()`, `setUTCHours()`).
        2. Convert the Date object back to a string before displaying it in the browser. You can use one of the many JavaScript `toString` functions (e.g. `toISOString()`, `toLocaleString()`) or create your own custom string from the Date object using UTC functions (e.g. `getUTCDate()`, `getUTCHours()`).
    2. If you need to create a custom date string from the ISO-formatted date string that was retrieved from your database, then use JavaScript's date formatting methods (e.g. `Intl.DateTimeFormat()`) or string methods (e.g. `String.substring()`, `String.split()`) on the ISO-formatted date string to create the date string that you need.
3. Display the date string in the browser (an output).

If you think of working with dates in terms of working with the string version of those dates, then you can avoid many of the pitfalls that are associated with Date objects.

For example, you can store dates in databases (an input) as strings in UTC time using the `toISOString()` method. All data in browsers are dispayed as strings, so if you need to display dates to a user in a browser (an output), then those dates will just be strings anyway. So if you store your dates as strings in your database, then when you retrieve those dates from your database you can convert them to Date objects, if necessary (e.g. if you need to manipulate a date or convert it to a different timezone), or convert them to a different format before displaying them to the user.

Remember that when creating dates or working with dates, it is probably best to always work with the UTC timezone and it is recommended to use the ISO format. If you need to display dates or times to a user, for example, you can always convert date strings and Date objects to a different timezone or format, if necessary.

It is important to understand that the implementation of Date between browsers and Node.js is different. For example, Node.js uses ISO-formatted Date objects set in the UTC timezone (see this [GitHub issue](https://github.com/nodejs/node/issues/9805#issuecomment-266484974)) while browsers use a Date object representing the date interpreted in the local timezone ([MDN Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)). There are a few things you can do to avoid these differences:

* Since strings do not get converted into different formats when transferred between different environments (browser, server, database), you can use the string version of Date objects instead of Date objects themselves. For example, the `toISOString()` method will work in both browsers and Node.js and is transferrable between both environments without any conversion or formatting issues. Just be aware that if you pass the result of the `toISOString()` method to a `new Date()` constructor, then you will get different results depending on the environment. 
* You can also use a library like [Moment.js](https://momentjs.com/) in both your frontend and backend code. You can then manage the format of your dates and you should have the same value in both environments.

Note that you can use UTC JavaScript methods (`date.setUTCHours()` instead of `date.setHours()`) in an effort to ensure that all datetime objects use UTC time, but that still won't work in browsers. The best options for working with dates inside browsers are the two options described above. However, in Node.js you can use UTC methods to get and set datetime objects in UTC time. You should use the UTC version of any date functions in Node.js when they are available.

Which ever option you choose, make sure to test your code and verify that it works as you expect.


## Examples

You can test these examples in a browser console or a Node REPL window (open a terminal window, type `node`, and press Enter) to see how they work and the results they return.


### Creating Date objects with UTC time and ISO format

In a browser the `new Date()` constructor will create a Date object that is evaluated to the local time zone. (See [Individual date and time component values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#individual_date_and_time_component_values) (MDN Date() constructor). But in Node.js the `new Date()` constructor will create an ISO-formatted Date object with UTC time. So instead of creating a date with `new Date()`, you can do this:

```
// This will create an ISO date string set to the current date and time in the UTC timezone. 
const isoDateString = new Date().toISOString();

// In Node.js, ISO-formatted date objects are the default implementation:
const isoDateObj = new Date();
```


In Node.js this will create a Date object that uses the UTC time zone and that is in ISO format. The `new Date.toISOString()` method will return a string representing this date in ISO format and the timezone is always UTC, as denoted by the suffix `Z` ([Date.prototype.toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)). Passing an ISO formatted date string to the `new Date()` constructor is standardized and will work reliably. (See [Several ways to create a Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#several_ways_to_create_a_date_object).)

You can also use one of these options to create a Date string or Date object with a specific date:

```
const dateString = "2024-01-15";

// This will create an ISO date string set to the current date in the UTC timezone with hours, minutes, seconds, and milliseconds all set to 0.
const isoDateString = new Date(dateString).toISOString();

// In Node.js, you can create an ISO-formatted Date object for a specific date like this:
const isoDateObj = new Date(dateString);
```

```
const today = new Date();
// The `getTime()` method returns the number of milliseconds for this date since midnight at the beginning of January 1, 1970, UTC.
const timestamp = today.getTime();
// Create a new Date object with the date and time that is returned from the `getTime()` method, which will be in UTC time.
// NOTE: In Node.js this will return an ISO-formatted Date object.
const dateObj = new Date(timestamp);
// Convert the Date object to an ISO date string.
const isoDateString = new Date(timestamp).toISOString();
```


### Set the time of a Date object in UTC time

Instead of using `setHours()` on a Date object, use the `setUTCHours()` method. This will work in browsers and Node.js, but in Node.js the Date object will be an ISO-formatted Date object set in UTC time and in browsers the Date object will represent the date interpreted in the local timezone. So, in the browser, if you want to display an ISO-formatted date that is set to UTC time to your users, then you will have to convert the Date object to a date string with the `toISOString()` method.

```
// Set `date` to the first millisecond of the date.
date.setUTCHours(0, 0, 0, 0);

// Set `date` to the last millisecond of the date.
date.setUTCHours(23, 59, 59, 999);
```

Keep in mind that the `setUTCHours()` method will return a timestamp in milliseconds, but `date` will still be a Date object. So if you use this in a function and you want to return the milliseconds that represent the Date object, then you would do this: 

```
return startDate.setUTCHours(0, 0, 0, 0);
```

But if you want to return the Date object, then you would do this:

```
return date
```
