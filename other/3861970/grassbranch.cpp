#include "GrassBranch.h"

GrassBranch::GrassBranch(VerticesPT& vertices) 
	:vertices(vertices)
	,width(40.0f)
	,start_dx(0)
	,end_dx(0)
	,num_vertices(0)
	,calculated_texcoords(false)
	,id(0)
	,tex1(0)
	,tex2(0)
{
}

GrassBranch::~GrassBranch() {
}

void GrassBranch::setup(int numSegments, Vec2 position, Vec2 direction, float w, int id) {
	this->id = id;
	this->direction = direction;
	this->position = position;
	this->width = w;

	Vec2 p = position;
	for(int i = 0; i < numSegments; ++i)  {
		p += direction;
		points.push_back(p);
	}
}

void GrassBranch::update() {
	// kinematic
	if(points.size() < 4) {
		return;
	}
	start_dx = vertices.size();

	Vec2 d;
	points[0] = position;
	points[1] = position;
	points[1].x += ofSignedNoise(id*0.1, ofGetElapsedTimeMillis() * 0.001) * -1.0f;
	for(int i = 2; i < points.size(); ++i) {
		d = points[i] - points[i-2];
		d.normalize();
		points[i] = points[i-1] + d * 80;
	}

	// Create triangle strip
	Vec2 a,b,perp;
	VertexPT vert;
	float w = width;
	float tex_w = 1024; 
	float tex_h = 768;
	
	for(int i = 1, j = 0; i < points.size()-1; ++i, ++j) {
		a = points[i];
		b = points[i+1];
		d = b - a;
		d.normalize();
		perp.x = -d.y;
		perp.y = d.x;
		perp *= w;

		// right vertex
		float t =  (i-1.0f)/(points.size()-2);

		a = points[i] + perp;
		vert.setPos(a.x, a.y, 0.0f);
		if(calculated_texcoords) {
			vert.setTex(texcoords[j * 2]);
		}
		else {
			vert.setTex(a.x / tex_w, a.y / tex_h);
			texcoords.push_back(Vec2(a.x / tex_w, a.y / tex_h));
		}
		vertices.add(vert);
		
		// left vertex
		a = points[i] - perp;
		vert.setPos(a.x, a.y, 0.0f);
		if(calculated_texcoords) {
			vert.setTex(texcoords[(j*2)+1]);
		}
		else {
			vert.setTex(a.x / tex_w, a.y / tex_h);
			texcoords.push_back(Vec2(a.x / tex_w, a.y / tex_h));
		}
		vertices.add(vert);
		w *= 0.9f;
	}
	end_dx = vertices.size();
	num_vertices = end_dx - start_dx;
	calculated_texcoords = true;
}

void GrassBranch::draw() {
}

void GrassBranch::debugDraw() {
	// line trough the "root"
	glColor3f(1.0f, 1.0f, 0.0f);
	glBegin(GL_LINE_STRIP);
	for(int i = 0; i < points.size(); ++i) {
		glVertex2fv(points[i].getPtr());
	}
	glEnd();

	// points of the "root"
	glColor3f(1.0f, 0.0f, 0.0f);
	glPointSize(5.0f);
	glBegin(GL_POINTS);
	for(int i = 0; i < points.size(); ++i) {
		glVertex2fv(points[i].getPtr());
	}
	glEnd();

	// triangle strip
	glEnable(GL_TEXTURE_2D); glBindTexture(GL_TEXTURE_2D, tex1);
	glColor3f(0.0f, 1.0f, 1.0f);
	glBegin(GL_TRIANGLE_STRIP);
	for(int i = start_dx; i < end_dx; ++i) {
		glTexCoord2fv(vertices[i].tex.getPtr());
		glVertex2fv(vertices[i].pos.getPtr());
		VertexPT pt = vertices[i];
	}
	glEnd();
	glPointSize(1.0f);
	glColor3f(1.0f, 1.0f, 1.0f);
	glBindTexture(GL_TEXTURE_2D, 0);
}