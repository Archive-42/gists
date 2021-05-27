#pragma once

#include "ofMain.h"
#include "Roxlu.h"

#define IDX(i,j)	(((j)*(w)) + (i))
#define DRAW(x,y) 	glVertex3f(-hs + (x) * size, field[IDX(x,y)].z + 1.0f, -hs + (y) * size); 

class testApp : public ofBaseApp{
	public:
		testApp();
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
		
		void drawGradientField(vector<ofVec3f>& field, int w, int h);
		vector<ofVec3f> createGradientField(int w, int h);
		void drawVector(ofVec3f& pos, ofVec3f v, float maxLen);
	
		int grad_w;
		int grad_h;
		float dt;
		float size;
		vector<ofVec3f> gradient_field;
		EasyCam cam;
		bool draw_grid;
		bool draw_field;
		bool draw_points;
		bool debug;
		
		// recording
		bool record;
		vector<ofImage> images;

};
