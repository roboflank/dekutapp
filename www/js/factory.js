angular.module('dekutapp.factory', ['ngResource', 'dekutapp.controller'])

//Factory for Articles

.factory('Article', function ($resource) {
  return $resource('http://localhost:3000/api/articles/:articleId');
})

//Factory for Notices
.factory('Notice', function ($resource) {
        return $resource('http://localhost:3000/api/notices/:noticeId');
    });