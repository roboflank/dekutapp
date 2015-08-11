angular.module('dekutapp.factory', ['ngResource'])

//Factory for Articles

.factory('Article', function ($resource) {
  return $resource('http://localhost:3000/api/articles/:articleId');
});