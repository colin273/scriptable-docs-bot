Type the name of the item you want after the command, with its "path" separated by periods. For example:

- For `Alert`, the command should be `{{prefix}}docs Alert`.
- For the `message` property of an `Alert`, the command is `{{prefix}}docs Alert.message`.
- For the `addAction()` method of an `Alert`, the command is `{{prefix}}docs Alert.addAction`.

All commands and arguments are case-insensitive, and can be used with any combination of spacing and extra characters after them. For example, `Alert` and `alert` are treated exactly the same, as are `addAction`, `addAction()`, `addaction`, etc.

Every result can be displayed in a short (just the link and title), normal, or long (shows properties and methods for top-level items) form. To use the short form, add `short` as an argument. Likewise, to use the long form, add `long` as an argument. For example: `{{prefix}}docs Alert short` or `{{prefix}}docs Alert long`. No extra arguments are needed for the normal form.