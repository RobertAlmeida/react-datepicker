/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
"use strict";

function stringOfLength(string, length) {
  var newString = "";
  for (var i = 0; i < length; i++) {
    newString += string;
  }
  return newString;
}

function generateTitle(name) {
  var title = "`" + name + "` (component)";
  return title + "\n" + stringOfLength("=", title.length) + "\n";
}

function generateDescription(description) {
  if (description) return description + "\n";

  return "";
}

function generatePropType(type) {
  var values;
  if (Array.isArray(type.value)) {
    values =
      "(" +
      type.value
        .map(function (typeValue) {
          return typeValue.name || typeValue.value;
        })
        .join("\\|") +
      ")";
  } else {
    values = type.value;
  }

  return "`" + type.name + (values ? values : "") + "`";
}

function generatePropDefaultValue(value) {
  return "`" + value.value + "`";
}

function generateProp(propName, prop) {
  return (
    "|`" +
    propName +
    "`" +
    (prop.required ? " (required)" : "") +
    "|" +
    (prop.type ? generatePropType(prop.type) : "") +
    "|" +
    (prop.defaultValue ? generatePropDefaultValue(prop.defaultValue) : "") +
    "|" +
    (prop.description ? prop.description + "\n\n" : "") +
    "|"
  );
}

function generateProps(props) {
  return (
    "| name  | type  | default value  | description  |" +
    "\n" +
    "|---|---|---|---|" +
    "\n" +
    Object.keys(props)
      .sort()
      .map(function (propName) {
        return generateProp(propName, props[propName]);
      })
      .join("\n")
  );
}

function generateMarkdown(name, reactAPI) {
  var markdownString =
    generateTitle(name) +
    "\n" +
    generateDescription(reactAPI.description) +
    "\n" +
    generateProps(reactAPI.props);

  return markdownString;
}

module.exports = generateMarkdown;
