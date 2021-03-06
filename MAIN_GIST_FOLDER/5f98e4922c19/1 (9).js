convert("one hundred five"); // "105"
convert("six hundred and fifty three"); // "653"
convert("zero zero one two three"); // "123"
convert("twelve o three"); // "1203"
convert("thirteen zero nine"); // "1309"
convert("fifteen sixteen"); // "1516"
convert("fourteen ninety two"); // "1492"
convert("nineteen ten"); // "1910"
convert("twelve hundred"); // "1200"
convert("twenty three hundred"); // "2300"
convert("twenty twenty"); // "2020" <---- ugh!
convert("twenty twenty one"); // "2021"  <---- ehhh...
convert("twenty twenty two"); // "2022"  <---- let's hope!
convert("four five two three eight"); // "45238"
convert("sixteen thousand three eighty four"); // "16384"
convert("seven billion six hundred eighty-one million"); // "7681000000"
convert("twenty three trillion and nine"); // "23000000000009"
convert("four billion two hundred nine thousand"); // "4000209000"
convert(
  "nine hundred ninety nine quadrillion nine ninety nine trillion nine hundred and ninety nine billion nine ninety-nine million nine hundred ninety-nine thousand nine ninety nine"
); // "999999999999999999"
convert(
  "one two three four five six seven eight nine eight seven six five four three two one two three four five"
); // "123456789876543212345"
convert("negative forty two"); // "-42"
convert("negative zero"); // "-0"

// "free units": dozen, score, pair
convert("a dozen and one"); // "13"
convert("three dozen"); // "36"
convert("sixty four dozen eighteen"); // "786"
convert("four score and seven"); // "87"
convert("seventeen score"); // "340"
convert("nine hundred ninety nine score and ninety nine"); // "20079"
convert("three pair"); // "6"
convert("thirty five pair"); // "70"
convert("five pair and one"); // "11"

// decimals
convert("forty two point zero"); // "42.0"
convert("three point one four one five nine two six"); // "3.1415926"
convert("point"); // "0.0"
convert("four point zero o o o zero"); // "4.00000"
convert("negative point"); // "-0.0"
convert("negative o point zero zero"); // "-0.00"
convert("negative point one two three"); // "-0.123"

// unit-place separator: ","
convert("sixty five thousand five thirty six", ","); // "65,536"
convert("four billion two hundred nine thousand", ","); // "4,000,209,000"
convert("forty two", ","); // "42"
convert("twenty one twenty three", ","); // "2,123"
convert(
  "one two three four five six seven eight nine eight seven six five four three two one two three four five",
  ","
); // "123456,789,876,543,212,345" <---- not a mistake, quadrillion is the highest supported "place"
convert("nine hundred ninety nine score and ninety nine", ","); // "20,079"
