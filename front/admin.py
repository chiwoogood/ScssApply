from django.contrib import admin
from .models import Book

class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'genre', 'published_date')
    list_filter = ('genre', 'published_date')
    search_fields = ('title', 'author')

admin.site.register(Book, BookAdmin)