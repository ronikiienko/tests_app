# tests_app

This is an app for creating and passing tests. You can try it here: https://tests.rost.pp.ua/ . All your changes and test create drafts WILL NOT be lost after page reload/browser closing.

----

## Types of questions:

Supports four types of questions:

- Checkbox questions (for example, question has four different answers, and you can select only N number of them. N is
  configurable when creating a test)
- Radio (for example, question has four different answers, and you can only select one of them)
- Number
- Text

----

## Passing test:

Import text config file, answer the questions, then press "finish test", and see results...

## Creating test:

When creating a test, you have unlimited number of questions and answers for them available.
When you click "Add new question", new question being created, asking you for question type (can be changed later)

If question type is "number", for every answer you can configure `min` , `max`  and `mark` fields. So, for example for
answers between 5 and 10 the mark is 0, while for answers between 11 and 100 the mark is 2.
If question type is not "number", you have `answer` and `mark` fields.

You can also configure general options, such as `testName`, `testDescription`, and results. Results configuring is
similar to questions. You create `resultRange` which consists of `min`, `max`, `resultName` and `resultDescription`.
So, if user got mark from 5 to 10 questions, you can tell that him what are his results with some custom `resultName`
and `resultDescription`

----

## Test transferring

Test config files are text files (they are encoded, and you can't read them)  that you can save to your file system and
then transfer to another user. Test config file can be edited => viewed only by test creator.

