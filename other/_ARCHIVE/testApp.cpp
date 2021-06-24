#include "testApp.h"

//--------------------------------------------------------------
void testApp::setup(){
    
  //------------------------------------------------------ 3D
    
	cam.rotate(-90, ofVec3f(1,0,0));
    //    cam.setTarget(cam_target);
//    cam.setDistance(ofGetHeight());
//	cam.setFov(50);
    
    view.x = 0;
	view.y = 0;
	view.width = ofGetWidth();
	view.height = ofGetHeight();

	
}

//--------------------------------------------------------------
void testApp::update(){

}

//--------------------------------------------------------------
void testApp::draw(){
    
    
    ofVec3f screenpoints[2];
	screenpoints[0] = ofVec3f( ofGetMouseX(), ofGetMouseY(), 0 );
	screenpoints[1] = ofVec3f( ofGetMouseX(), ofGetMouseY(), 0 );
    convertScreenCoordinatesToRay( cam, screenpoints );
    
    cam.begin();
    
    
    ofBox(0, 0, 10, 10);
    
    
    //define plane
    ofVec3f p0 = ofVec3f(0,0,0);
    // our plane is always perpendicular to the camera
    ofVec3f pNormal = cam.getPosition().normalize();
    
    ofVec3f pIntersect = planeIntersectWithRay( p0, pNormal, screenpoints[0], screenpoints[1] );
    
    node.setPosition(pIntersect);
    node.draw();
    
    cam.end();
    
}


//--------------------------------------------------------------
// transforms two 2d screen points into a ray
// a ray or a line is a point and a direction vector the line is going in
void testApp::convertScreenCoordinatesToRay( ofCamera cam, ofVec3f points[2] )
{
    ofVec3f ray[2];
    ofRectangle view = ofRectangle( 0,0,ofGetWidth(), ofGetHeight() );
    
    // get the far plane projected point and the near plane projected point
    // far <> near plane range between -1 <> 1
	ray[0] = ofVec3f(points[0].x, points[0].y, -1);
	ray[1] = ofVec3f(points[1].x, points[1].y, 1);
    
	// Transform ray into world space
	ray[0] = cam.screenToWorld(ray[0], view);
	ray[1] = cam.screenToWorld(ray[1], view);
//    ofLogNotice() << "ray[0]: " << ray[0] << " ray[1]: " << ray[1];
    
    ofVec3f directionRay = ray[1] - ray[0];
    
    points[0] = ray[0];
    points[1] = directionRay;
}


//--------------------------------------------------------------
// http://paulbourke.net/geometry/pointlineplane/
// http://en.wikipedia.org/wiki/Line-plane_intersection

ofVec3f testApp::planeIntersectWithRay( ofVec3f p0, ofVec3f pNormal, ofVec3f rayP, ofVec3f rayDir )
{
    // this computes me the scalar I need to muliply the line with to get to the intersection point.
    float dL = pNormal.dot(p0 - rayP) / pNormal.dot(rayDir);

    // LinePoint1+dL*(LinePoint2-LinePoint1)
    ofVec3f pIntersect = rayP + (dL * rayDir);
    
    return pIntersect;
}

//--------------------------------------------------------------
void testApp::keyPressed(int key){

}

//--------------------------------------------------------------
void testApp::keyReleased(int key){

}

//--------------------------------------------------------------
void testApp::mouseMoved(int x, int y){

}

//--------------------------------------------------------------
void testApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::windowResized(int w, int h){
    
    view.x = 0;
	view.y = 0;
	view.width = ofGetWidth();
	view.height = ofGetHeight();
    
}

//--------------------------------------------------------------
void testApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void testApp::dragEvent(ofDragInfo dragInfo){ 

}