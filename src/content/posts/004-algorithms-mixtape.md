---
title: "Algorithms Mixtape"
date: 2020-06-19
---

<div style="text-align:center"><img src="https://www.dropbox.com/s/kkc1n53lzl8uodb/36940884903_077a7a863c_w.jpg?raw=1" /></div>

I love mixtapes.

## mergesort vs. quicksort

Mergesort was known to John von Neumann as early as 1945. Despite being over 70
years old, it's still one of the choice sorting algorithms today. It's is a
canonical "divide-and-conquer" algorithm. It splits the input into two
sub-problems, recursively solves each sub-problem, and then combines the
solutions to the sub-problems. While there are many variations, the classic
approach returns a new sorted copy of the input.

Tony Hoare developed the quicksort in 1959 when he was only 25! It was published
2 years later in 1961. Like mergesort, it's also a "divide-and-conquer"
algorithm. There are 2 key ideas behind quicksort: partitioning and randomization. Both
will be reviewed in detail below. There are also many variations from the original
algorithm, but the classic approach performs the sort in-place.

For large input sizes, both algorithms have better runtime performance than other sorting
algorithms such as selection, insertion, and bubble sort.

|                               | mergesort           | quicksort                      |
| ----------------------------- | ------------------- | ------------------------------ |
| Divide and Conquer Algorithms | ✅                  | ✅                             |
| Uses randomization            | ❌                  | ✅                             |
| Time complexity               | _O_ ( _n_ log _n_ ) | _O_ ( _n_ log _n_ ) on average |
| Space complexity              | _O_(_n_)            | _O_(1)                         |
|                               |                     |                                |

<!-- <div style="text-align:center"><img src="https://www.dropbox.com/s/8a5y5osan9hssrp/subway.jpg?raw=1" /></div> -->

## mergesort

<div style="text-align:center"><img src="https://www.dropbox.com/s/uqyw1pw6pff77nk/3253887666_91392b67e5_c.jpg?raw=1" /></div>

```python
# mergesort.py

def mergesort(num_list: list) -> list:
    if len(num_list) <= 1:
        return num_list[:]

    split = len(num_list) // 2
    left = mergesort(num_list[:split])
    right = mergesort(num_list[split:])
    return merge(left, right)


def merge(l: list, r: list) -> list:
    index_l = 0
    index_r = 0
    sorted_list = []
    while index_l < len(l) and index_r < len(r):
        if l[index_l] <= r[index_r]:
            sorted_list.append(l[index_l])
            index_l += 1
        else:
            sorted_list.append(r[index_r])
            index_r += 1

    sorted_list.extend(l[index_l:])
    sorted_list.extend(r[index_r:])
    return sorted_list
```

Read the full source - [Algorithms
Mixtape - mergesort](https://github.com/julianmclain/algorithms-mixtape/tree/master/src/mergesort)

### Runtime Analysis

The [Master
Method](<https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)>)
is a great black-box approach for determining the runtime of divide-and-conquer
algorithms. It states that an function denoted _T(n)_ can be expressed by the
recurrence relation:

> _T_(_n_) <= _aT_(_n_/_b_) + _O_(_n_<sup>_d_</sup>)

Where _a_ is the number of recrusive calls, _b_ is the factor by which the input
size shrinks in every subproblem, and _d_ is the exponent in the running time of
the "combine" step.

For mergesort, we fill in the following constants:

- _a_ = 2
- _b_ = 2
- _d_ = 1

This puts the run time in category 1 of 3 since _a_ = _b<sup>d</sup>_. Category 1 run
times are defined as _T_(_n_) = _O_(_n_<sup>_d_</sup> log _n_). Filling in the
_d_ parameter, we end up with a run time of:

> _O_(_n_ log _n_)

The Master Method is a cool party trick, but the die-hard skeptic in me
wasn't convinced after I ran that black box analysis. mergesort is a hall of fame
algorithm, and I wanted better proof that it can sort an array in _O_(_n_ log _n_)
time.

Intuitively, we can confirm the Master Method by analyzing the algorithm as a
recursion tree. The root node of the tree corresponds to the outermost call with
the original input _n_ (level 0). Except in the base case, each call to
`mergesort` produces two recursive calls modeled as child nodes.

![recursion-tree](https://www.dropbox.com/s/18hvfyg61rlt3dc/recursion-tree.jpg?raw=1)

The diagram makes it clear that the total work performed equals the work done
per level multiplied by the number of levels. Ultimately, what we need is:

> _Total work_ = _total work per level_ \* _number of levels_

Let's start by determining the amount of work done per level:

> _Total work per level_ = _work per sub-problem_ \* _number of sub-problems_

Returning to the high-level description of `mergesort` above, there are 3 steps
(excluding the base case):

1. recusively sort the left
2. recursively sort the right
3. `merge`

When analyzing the work done at a single level, we can ignore the recursive
calls. The work performed in recursive calls will be accounted for when we
multiply by the number of levels in the recursion tree. As a result, the total
work done in a given call to `mergesort` is equal to the amount of work done in
the `merge` subroutine. `merge` has to examine every element in the left and
right input arrays, so the work performed by merge is proportional to the input
size. Return to our recursion tree diagram and notice the relationship between
the size of _n_ and the number of sub-problems at a given level. Mergesort has an
especially satisfying design because the amount of work done in each sub-problem
decreases at the same rate that the number of sub-problems increases. They
operate in perfect equalibrium. No matter the level, the aggregate input size is
_n_. Given that the aggregate input size at every level equals _n_ and
that `merge` must visit every element in the input, we can confidently say that
`merge`, and consequently `mergesort`, will perform _O(n)_ work at every level.

Now for the number of levels. Looking at the recursion tree, you can see that
the input size shirnks by a factor of 2 with each level (e.g. n, n/2, n/4, n/8,
n/16...). Eventually, the input size will be equal or less than 1. At that
point, the base case kicks in and the recursion ends. To determine the number of
levels, what we need is an operation that will tell us how many times we need to
divide _n_ by 2 until we reach a number that is 1 or less. Luckly, this is the
exact definition of log<sub>2</sub>. For example:

> log<sub>2</sub>16 = 4
>
> 4 is the number of times you need to divide 16 by 2 until you reach 1 or less

Equipped with this info, we know that number of levels in the recursion tree is
log<sub>2</sub> _n_. Let's return to our original forumla and fill in the _total
work per level_ and the _number of levels_.

> _Total work_ = _O_(_n_) \* log<sub>2</sub> _n_

Logarithms of a different base only differ by a constant factor so we can eliminate
the base: _O_(_n_ log _n_). There it is! The Master Method holds up, and we have an
intuitive understanding for why mergesort runs in _O_(_n_ log _n_) time.

## quicksort

```python
from random import randint


def quicksort(num_list: list) -> None:
    _quicksort(num_list, 0, len(num_list) - 1)


def _quicksort(num_list: list, left_index: int, right_index: int) -> None:
    if left_index >= right_index:
        return
    else:
        i = choose_pivot(left_index, right_index)
        pivot_element = num_list[i]
        num_list[i] = num_list[left_index]
        num_list[left_index] = pivot_element

        j = partition(num_list, left_index, right_index)
        _quicksort(num_list, left_index, j - 1)
        _quicksort(num_list, j + 1, right_index)


def choose_pivot(left: int, right: int) -> int:
    return randint(left, right)


def partition(num_list: list, left: int, right: int) -> int:
    pivot = num_list[left]
    index_after_pivot = left + 1
    for cur, num in enumerate(num_list[left + 1 : right + 1], left + 1):
        if num < pivot:
            num_list[cur] = num_list[index_after_pivot]
            num_list[index_after_pivot] = num
            index_after_pivot += 1
    num_list[left] = num_list[index_after_pivot - 1]
    num_list[index_after_pivot - 1] = pivot
    return index_after_pivot - 1
```

### Runtime Analysis

The runtime analysis of quicksort is a bit more involved due to the
randomization. In order to understand the driver of asymptotic runtime in
quicksort, we have to start with partitioning an array around a pivot element. In
the first step of the process, the element at index `i` is selected from the
array `A`. Then the array is modified in place such that all elements less than
`A[i]` are positioned before it and all elements greater than `A[i]` are
positioned after it. While the operation doesn't gaurantee that the elements to
the "left" and "right" are sorted relative to each other, it does gaurantee that
the pivot element is in it's "correct" sorted position. For example:

```
Array A = [3, 8, 2, 5, 1, 4, 7, 6]
```

Now let's select the first element as the pivot and partition the array.

```
[2, 1, 3, 6, 7, 4, 5, 8]
```

After partitioning, note the result:

- The pivot element is in it's ultimate sorted position
- Elements left of pivot are less than the pivot element
- Elements right of pivot greater than the pivot element

While partitioning doesn't completely sort an array, it's the key to mergesort
because it enables a "divide and conquer" approach. After partitioning an array,
the sorting problem can be broken down into 2 sub-problems: sorting the left elements and sorting the right elements. The pivot element can be excluded from the sub-problems
since partitioning already places it in the final sorted position.

Finally, with a small constant of memory usage, all of the operations can be done in-place.

### Asymptotic runtime

The run time of Quicksort hinges completely on the quality of the pivot chosen.

#### Worst case scenario

The worst case scenario occurs when the chosen pivot is always the smallest
element of the array. In this case, the `partition` subroutine will scan the
array and never find any elements less than the pivot. As a result, the
subsequent left recursive call will receive an empty sub-array and the right
recursive call will receive a sub-array containing all remaining elements minus
the pivot. Over the entire execution of `quicksort`, the `partition` subroutine
will be called with sub-arrays of length _n_, _n_ - 1, _n_ - 2, ... 1. Since the
work done in `partition` is equal to the length of the sub-array, `partition`
will perform _n_ + (_n_ - 1) + (_n_ - 2) ... + 1 or

> _O_(_n_<sup>2</sup>)

While this exact scenario sounds unlikely, it will occur if quicksort is passed
an already sorted array, and the `choose_pivot` subroutine is implemented to
always select the first element as the pivot.

#### Best case scenario

On the other hand, if the chosen pivot happens to always be the median element,
then the array will be evenly split into 2 sub-arrays of `n/2` length. Each
recursive call decreases the input by a constant factor indepenent of _n_ which
is great because it allows us to use the Master Method to determine the runtime.

Let's assume that `choose_pivot` can identify the median in _O_(_n_) time,
and `partition` also operates in _O_(_n_) time.

The [Master
Method](<https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)>)
states that the runtine of a divide-and-conquer algorithm denoted _T(n)_ can be
expressed by the recurrence relation:

> _T_(_n_) <= _aT_(_n_/_b_) + _O_(_n_<sup>_d_</sup>)

Where _a_ is the number of recrusive calls, _b_ is the factor by which the input
size shrinks in every subproblem, and _d_ is the exponent in the running time of
the "combine" step.

For quicksort, we fill in the following constants:

- _a_ = 2
- _b_ = 2
- _d_ = 1

This puts quicksort's runtime in category 1 of 3 since _a_ = _b<sup>d</sup>_.
Category 3 run times are defined as _T_(_n_) = _O_(_n_<sup>_d_</sup> log _n_).
Filling in the _d_ parameter, we end up with a run time of:

> _O_(_n_ log _n_)

Note that this is the same recurrence relation observed in mergesort.

#### Randomization

The performance disparity between the worst case and best case scenario is
pretty big. Knowing that it's possible to implement `choose_pivot` such that
quicksort runs in _O_(_n_ log _n_) time, why would any other implementations
exist?

As it turns out, simply selecting the pivot at random will produce an _average_
runtime of _O_(_n_ log _n_). I won't give the full-blown mathematical proof of
that fact, but intuitively it seems plausible. If we define an "approximate
median" as any number between the 25th percentile and the 75th percentile, then
there's a 50% chance that a randomly selected pivot will be an "approximate
median." Randomization is a second key idea in quicksort. There are many
computational problems for which randomized algorithms are faster, more
effective, and easier to code than deterministic counterparts.

Corrections are appreciated - if you see an error, please create a [Github issue](https://github.com/julianmclain/blog/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) 🍻.

"De La Soul tape A-side" by Mike B in Colorado is licensed under CC0 1.0
"Subway Station" by Doug Reilly is licensed under CC BY 2.0
