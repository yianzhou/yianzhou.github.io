# CMake

[CMake Reference Documentation](https://cmake.org/cmake/help/latest/manual/cmake.1.html)

Today CMake generates modern buildsystems such as Ninja as well as project files for IDEs such as Visual Studio and Xcode.

## A Basic Starting Point

[Step 1: A Basic Starting Point](https://cmake.org/cmake/help/latest/guide/tutorial/A%20Basic%20Starting%20Point.html)

The most basic CMake project is an executable built from a single source code file. For simple projects like this, a `CMakeLists.txt` file with three commands is all that is required:

- `cmake_minimum_required()`: establishes policy settings and ensures that the following CMake functions are run with a compatible version of CMake
- `project()`: set the project name
- `add_executable()`: tells CMake to create an executable using the specified source code files

[Step 2: Adding a Library](https://cmake.org/cmake/help/latest/guide/tutorial/Adding%20a%20Library.html)

To add a library in CMake, use the `add_library()` command and specify which source files should make up the library.

`STATIC`, `SHARED`, or `MODULE` may be given to specify the type of library to be created:

- `STATIC` libraries are archives of object files for use when linking other targets.
- `SHARED` libraries are linked dynamically and loaded at runtime.
- `MODULE` libraries are plugins that are not linked into other targets but may be loaded dynamically at runtime using dlopen-like functionality.

```cmake
add_library(editorFramework SHARED
            editorFramework.cc
            editorFramework.h
)
```

Rather than placing all of the source files in one directory, we can organize our project with one or more subdirectories. In this case, we will create a subdirectory specifically for our library. Here, we can add a new CMakeLists.txt file and one or more source files. In the top level CMakeLists.txt file, we will use the `add_subdirectory()` command to add the subdirectory to the build.

Once the library is created, it is connected to our executable target with `target_include_directories()` and `target_link_libraries()`.

[Step 3: Adding Usage Requirements for a Library](https://cmake.org/cmake/help/latest/guide/tutorial/Adding%20Usage%20Requirements%20for%20a%20Library.html)

- `target_compile_definitions()`
- `target_compile_options()`
- `target_include_directories()`
- `target_link_directories()`
- `target_link_options()`
- `target_precompile_headers()`
- `target_sources()`

只看官网教程前三步、完成 TODO 基本够用了。

## CMake Commands

```
cmake ./CMakeLists.txt \
   -B ./out \
   -G Xcode \
   -DCMAKE_TOOLCHAIN_FILE=./ios.toolchain.cmake \
   -DPLATFORM=OS64COMBINED \
   -DDEPLOYMENT_TARGET=11.0 \
   -DENABLE_BITCODE=NO \
   -DENABLE_ARC=YES \
   -DDEFINES_MODULE=YES \
```

`-B ./out`: Path to directory which CMake will use as the root of build directory.

`-G Xcode`: Specify a build system generator. `cmake --help` output lists available generators on the current platform.

`-D`: Create or update a CMake CACHE entry.

`CMAKE_TOOLCHAIN_FILE`: a file which is read early in the CMake run and which specifies target platform and compiler related information.

`PLATFORM=OS64COMBINED`: `ios.toolchain.cmake` 文件里定义的，这个文件可以在 <https://github.com/leetal/ios-cmake> 下载

## CMake Cache

The first time CMake is run on a project, it produces a `CMakeCache.txt` file. It may be thought of as a configuration file.

To create a variable in the cache, use commands like `option`, `find_file`, or the standard `set` command with the CACHE option.

```c
option(USE_JPEG "Do you want to use the jpeg library")

set(USE_JPEG ON CACHE BOOL "include jpeg support?")
```

When you use the `CACHE` option, you may also provide the type of the variable and a documentation string.

Once a variable is in the cache, its “cache” value cannot normally be modified from a CMakeLists file. A `set(FOO ON CACHE BOOL "doc")` command will typically only do something when the cache doesn’t have the variable in it. Once the variable is in the cache, that command will have no effect.

In the rare event that you really want to change a cached variable’s value, use the `FORCE` option in combination with the `CACHE` option to the `set` command.

If a variable is in the cache, it can still be overridden in a CMakeLists file using the `set` command without the `CACHE` option. The set command will define a variable for the current scope without changing the value in the cache.

To restrict a cache entry to a limited set of predefined options:

```c
set(CRYPTOBACKEND "OpenSSL" CACHE STRING "Select a cryptography backend")
set_property(CACHE CRYPTOBACKEND PROPERTY STRINGS "OpenSSL" "LibTomCrypt" "LibDES")
```

## CMakeLists.txt

```bash
# 设置 Xcode Build Settings：
# 1. Debug 或模拟器生成 dwarf（不生成 dsym），加快编译速度
# 2. Release + ARM64 架构生成 dwarf-with-dsym，用于还原线上堆栈的符号
function(setDebugSymbolsAndDebugInformationFormat target)
    set_target_properties(${target} PROPERTIES XCODE_ATTRIBUTE_DEBUG_INFORMATION_FORMAT[variant=Debug] "dwarf")
    set_target_properties(${target} PROPERTIES XCODE_ATTRIBUTE_GCC_GENERATE_DEBUGGING_SYMBOLS[variant=Debug] "YES")
    set_target_properties(${target} PROPERTIES XCODE_ATTRIBUTE_DEBUG_INFORMATION_FORMAT[variant=Release][sdk=iphonesimulator*] "dwarf")
    set_target_properties(${target} PROPERTIES XCODE_ATTRIBUTE_GCC_GENERATE_DEBUGGING_SYMBOLS[variant=Release][sdk=iphonesimulator*] "YES")
    set_target_properties(${target} PROPERTIES XCODE_ATTRIBUTE_DEBUG_INFORMATION_FORMAT[variant=Release][sdk=iphoneos*] "dwarf-with-dsym")
    set_target_properties(${target} PROPERTIES XCODE_ATTRIBUTE_GCC_GENERATE_DEBUGGING_SYMBOLS[variant=Release][sdk=iphoneos*] "YES")
endfunction()

function (setToAllTargets current_dir)
    # 对当前目录下的 targets 执行 setDebugSymbolsAndDebugInformationFormat 函数
    get_property(targets DIRECTORY ${current_dir} PROPERTY BUILDSYSTEM_TARGETS)
    foreach(target ${targets})
        setDebugSymbolsAndDebugInformationFormat(${target})
        message("设置 Xcode Build Settings --- " ${target})
    endforeach()

    # 递归对当前目录下的所有子目录执行 setToAllTargets 函数
    get_property(subdirs DIRECTORY ${current_dir} PROPERTY SUBDIRECTORIES)
    foreach(subdir ${subdirs})
        setToAllTargets(${subdir})
    endforeach()
endfunction()
```
