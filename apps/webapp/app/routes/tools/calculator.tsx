import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const gradeScale = {
  A: 10,
  B: 9,
  C: 8,
  D: 7,
  E: 6,
  F: 0,
};

interface Course {
  id: number;
  name: string;
  credits: number;
  grade: string;
  gradePoint: number;
}

export default function CGPACalculator() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseName, setCourseName] = useState("");
  const [credits, setCredits] = useState<number>(3);
  const [grade, setGrade] = useState<string>("A");
  const [nextId, setNextId] = useState(1);

  const addCourse = () => {
    if (!courseName) return;

    const gradePoint = gradeScale[grade as keyof typeof gradeScale] || 0;

    setCourses([
      ...courses,
      {
        id: nextId,
        name: courseName,
        credits: credits,
        grade: grade,
        gradePoint: gradePoint,
      },
    ]);

    setNextId(nextId + 1);
    setCourseName("");
    setCredits(3);
    setGrade("A");
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const calculateCGPA = () => {
    if (courses.length === 0) return 0;

    const totalCredits = courses.reduce(
      (sum, course) => sum + course.credits,
      0
    );
    const totalGradePoints = courses.reduce(
      (sum, course) => sum + course.gradePoint * course.credits,
      0
    );

    return totalGradePoints / totalCredits;
  };

  const cgpa = calculateCGPA();

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="text-center p-6 border-b">
          <h2 className="text-black text-2xl font-bold">CGPA Calculator</h2>
          <p className="text-gray-500 mt-1">
            Calculate your Cumulative Grade Point Average
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label
                htmlFor="course-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Name
              </label>
              <input
                id="course-name"
                type="text"
                placeholder="Enter course name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="credits"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Credits
              </label>
              <select
                id="credits"
                value={credits.toString()}
                onChange={(e) => setCredits(Number.parseInt(e.target.value))}
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6].map((credit) => (
                  <option key={credit} value={credit.toString()}>
                    {credit}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="grade"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Grade
              </label>
              <select
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.keys(gradeScale).map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={addCourse}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Course
          </button>

          {courses.length > 0 && (
            <div className="rounded-md border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Course Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]"
                    >
                      Credits
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]"
                    >
                      Grade
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]"
                    >
                      Points
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[80px]"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {course.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black text-center">
                        {course.credits}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black text-center">
                        {course.grade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black text-center">
                        {course.gradePoint}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => removeCourse(course.id)}
                          className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="p-6 border-t space-y-4">
          <div className="w-full p-4 rounded-lg bg-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Courses
                </p>
                <p className="text-2xl font-bold text-black">
                  {courses.length}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Credits
                </p>
                <p className="text-2xl font-bold text-black">
                  {courses.reduce((sum, course) => sum + course.credits, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full p-6 rounded-lg bg-blue-50 text-center">
            <h3 className="text-lg font-medium mb-2 text-blue-800">
              Your CGPA
            </h3>
            <p className="text-4xl font-bold text-blue-900">
              {cgpa.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
