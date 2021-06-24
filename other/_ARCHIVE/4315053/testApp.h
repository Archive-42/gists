#pragma once

#include "ofMain.h"

class testApp : public ofBaseApp{
  public:
		void setup();
		void update();
		void draw();
		
		void keyPressed(int key);
		void keyReleased(int key);
		void mouseMoved(int x, int y);
		void mouseDragged(int x, int y, int button);
		void mousePressed(int x, int y, int button);
		void mouseReleased(int x, int y, int button);
		void windowResized(int w, int h);
		void dragEvent(ofDragInfo dragInfo);
		void gotMessage(ofMessage msg);
    
    void convertScreenCoordinatesToRay( ofCamera cam, ofVec3f points[2] );
    ofVec3f planeIntersectWithRay( ofVec3f pO, ofVec3f pNormal, ofVec3f rayP, ofVec3f rayDir );
    
    
    ofEasyCam cam;
    
    ofNode node;
    ofRectangle view;
    
    ofVec3f worldmouse;
    //ray drawn under mouse cursor [start,end]
};