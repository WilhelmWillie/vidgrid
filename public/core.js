// Core.js
// Angular fun :-)

var vidgrid = angular.module('vidGrid', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$scope.hasMsg = false // Used for showing post error messages

	$scope.loadVideos = function() {
		$http.get('/api/videos')
			.success(function(data) {
				$scope.videos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.createVideo = function() {
		$http.post('/api/videos', $scope.formData)
			.success(function(data) {
				// Success = The response got through.. However, it doesn't mean the video was posted succesfully

				if (data.error) { // We got an error on our hands :-)
					$scope.flashMsg = "Error: " + data.error;
					$scope.hasMsg = true;
				} else {
					$scope.formData = {};
					$scope.loadVideos ();
					$scope.hasMsg = false;
				}
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.getEmbedUrl = function(id) {
		return '//www.youtube.com/embed/' + id;
	}

	$scope.loadVideos ();
}

vidgrid.filter('trustAsResourceUrl', ['$sce', function($sce) {
	return function(val) { return $sce.trustAsResourceUrl(val);};
}]);