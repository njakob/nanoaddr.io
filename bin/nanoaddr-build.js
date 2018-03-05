#!/usr/bin/env node

require('@babel/register');
const build = require('../src/scripts/build');

build.default();
