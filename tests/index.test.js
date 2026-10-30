const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');

const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');

test('index.html declares English and includes responsive metadata', () => {
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<meta charset="UTF-8">/);
  assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1\.0">/);
});

test('index.html has the expected page title', () => {
  assert.match(html, /<title>Simple Page<\/title>/);
});

test('index.html contains the expected heading', () => {
  assert.match(html, /<h1>Welcome<\/h1>/);
});

test('index.html contains exactly the three expected paragraphs', () => {
  assert.deepEqual(html.match(/<p>.*?<\/p>/g), [
    '<p>This is the first paragraph.</p>',
    '<p>This is the second paragraph.</p>',
    '<p>This is the third paragraph.</p>',
  ]);
});
