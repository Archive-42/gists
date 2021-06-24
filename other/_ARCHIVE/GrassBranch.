#ifndef APOLLO_GRASSBRANCH
#define APOLLO_GRASSBRANCH

#include <roxlu/Roxlu.h>
#include <vector>

class GrassBranch {
public:
	GrassBranch(VerticesPT& vertices);
	~GrassBranch();
	void setup(int numSegments, Vec2 position, Vec2 direction, float w, int id);
	void update();
	void draw();
	void debugDraw();
	
	// bunch of setter/getters
	void setTextures(GLuint a, GLuint b);
	GLuint getTex1();
	GLuint getTex2();
	size_t getStartIndex();
	size_t getNumVertices();
private:
	std::vector<Vec2> texcoords;
	VerticesPT& vertices;
	std::vector<Vec2> points;
	Vec2 direction;
	Vec2 position;
	float width;
	size_t start_dx;
	size_t end_dx;
	size_t num_vertices;
	bool calculated_texcoords;
	int id; // used for randomness
	GLuint tex1;
	GLuint tex2;
};

inline void GrassBranch::setTextures(GLuint a, GLuint b) {
	tex1 = a;
	tex2 = b;
}

inline GLuint GrassBranch::getTex1() {
	return tex1;
}

inline GLuint GrassBranch::getTex2() {
	return tex2;
}

inline size_t GrassBranch::getStartIndex() {
	return start_dx;
}

inline size_t GrassBranch::getNumVertices() {
	return num_vertices;
}
#endif