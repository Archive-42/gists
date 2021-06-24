#include "testApp.h"

testApp::testApp()  {
}

void testApp::setup(){
	ofBackground(22,33,44);
	ofSetFrameRate(60);
	
	grad_w = 50;
	grad_h = 50;
	dt = 0.06;
	size = 0.1;
	gradient_field = createGradientField(grad_w, grad_h);
	
	cam.setup(ofGetWidth(), ofGetHeight());
	cam.setPosition((size*grad_w)*0.5, 1.0f, 10.0f);
	draw_grid = true;
	draw_field = true;
	draw_points = true;
	record = false;
//	img.setUseTexture(false);
}

// we use ofNoise to generate a scalar value from which we create a gradient field.
vector<ofVec3f> testApp::createGradientField(int w, int h) {
	float t = ofGetElapsedTimef()*0.1;
	vector<ofVec3f> field(w*h, ofVec3f());
	for(int i = 0; i < w; ++i) {
		for(int j = 0; j < h; ++j) {
			int dx = (j * w) + i;
			float idt = i*dt + t;
			float jdt = j*dt + t;
			
			// Get the derivative for the gradient field.
			float deriv_x = ofNoise(idt+dt,jdt) - ofNoise(idt-dt,jdt);
			float deriv_y = ofNoise(idt,jdt+dt) - ofNoise(idt, jdt - dt);
			float deriv_z = 0;
			field[dx].set(deriv_x, deriv_y, ofNoise(idt, jdt));
		}
	}
	return field;
}

void testApp::drawGradientField(vector<ofVec3f>& field, int w, int h) {
	float hs = size * 0.5f;

	// draw the scalars as grid.
	if(draw_grid) {
		glColor3f(1,1,1);

		glPolygonMode(GL_FRONT_AND_BACK, GL_LINE);
		glBegin(GL_QUADS);
		for(int i = 0; i < w-1; ++i) {
			for(int j = 0; j < h-1; ++j) {
				DRAW(i,j);
				DRAW(i+1,j);
				DRAW(i+1,j+1);
				DRAW(i,j+1);
			}
		}
		glEnd();
	}

	// draw the scalars as points
	if(draw_points) {
		glColor3f(0.0f,0.8f,0.2f);
		glPointSize(3.0f);
		glBegin(GL_POINTS);
		for(int i = 0; i < w; ++i) {
			for(int j = 0; j < h; ++j) {
				int dx = (j * w) + i;
				DRAW(i,j);
			}
		}
		glEnd();
	}
	
	
	// draw the gradient field
	if(draw_field) {
		glColor3f(1,0,0);
		for(int i = 0; i < w; ++i) {
			for(int j = 0; j < h; ++j) {
				int dx = (j * w) + i;	
				ofVec3f pos(-hs + i*size, 0, -hs + j*size);
				ofVec3f v(field[dx].x,field[dx].y, 0);
				drawVector(pos, field[dx],size);
			}
		}
	}
}

void testApp::drawVector(ofVec3f& pos, ofVec3f v, float maxLen) {
	v.normalize();
	v *= maxLen;

	glBegin(GL_LINES);
		glColor3f(0.8f, 0.2f, 0.0f); 	glVertex3f(pos.x, 0, pos.z);
		glColor3f(0.9f, 0.8f, 0.0f);	glVertex3f(pos.x + v.x, 0, pos.z+v.y);
	glEnd();
}


void testApp::draw(){
	
	
	glColor3f(1.0f, 1.0f, 1.0f);
	if(record) {
		ofSetWindowTitle(ofToString(ofGetFrameRate()) + " [ recording ] ");
	}
	else {
		ofSetWindowTitle(ofToString(ofGetFrameRate()));
	}

	cam.place();
	gradient_field = createGradientField(grad_w, grad_h);
	drawGradientField(gradient_field, grad_w, grad_h);
	
	if(record) {
		ofImage img;
		img.setUseTexture(false);
		img.allocate(ofGetWidth(), ofGetHeight(), OF_IMAGE_COLOR);
		img.grabScreen(0,0,img.getWidth(), img.getHeight());
		img.update();
		images.push_back(img);
	
	}	
}

void testApp::keyPressed(int key){
	if(key == 'd') {
		debug = !debug;
	}
	else if(key == 'f') {
		draw_field = !draw_field;
	}
	else if(key == 'g') {
		draw_grid = !draw_grid;
	}
	else if(key == 'p') {
		draw_points = !draw_points;
	}
	else if(key == 'r') {
		record = !record;
	}
	else if(key == 's') {
		char buf[512];
		for(int i = 0; i < images.size(); ++i) {
			sprintf(buf, "img_%04d.png", i);
			printf("Save: %s\n", buf);
			images[i].saveImage(buf);
		}
	}
}

void testApp::mouseDragged(int x, int y, int button){
	cam.onMouseDragged(x,y);
}
void testApp::mousePressed(int x, int y, int button){
	cam.onMouseDown(x,y);
}


void testApp::update(){}
void testApp::keyReleased(int key){ }
void testApp::mouseMoved(int x, int y){}
void testApp::mouseReleased(int x, int y, int button){}
void testApp::windowResized(int w, int h){ }
void testApp::gotMessage(ofMessage msg){}
void testApp::dragEvent(ofDragInfo dragInfo){ }